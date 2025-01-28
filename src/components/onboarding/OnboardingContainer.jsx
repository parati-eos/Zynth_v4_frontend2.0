import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.jsx'
import CompanyNameForm from './onboarding-sections/CompanyNameForm.tsx'
import ContactDetailsForm from './onboarding-sections/ContactDetailsForm.tsx'
import IndustryForm from './onboarding-sections/IndustryForm.tsx'
import LogoForm from './onboarding-sections/LogoForm.tsx'
import WebsiteLinkForm from './onboarding-sections/WebsiteLinkForm.tsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormData } from '../../types/onboardingTypes.ts'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserPlan } from '../../redux/slices/userSlice.ts'

const OnboardingContainer: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(1)
  const [visitedSections, setVisitedSections] = useState<number[]>([1]) // Start with the first section visited
  const [isMediumOrLargerScreen, setIsMediumOrLargerScreen] = useState(false)
  const [isNextLoading, setIsNextLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    linkedin: '',
    sector: '',
    industry: '',
    websiteLink: '',
    logo: null,
  })
  const [submittedData, setSubmittedData] = useState<
    Record<number, Partial<FormData>>
  >({})

  const navigate = useNavigate()
  const orgId = sessionStorage.getItem('orgId')
  const userId = sessionStorage.getItem('userEmail')
  const authToken = sessionStorage.getItem('authToken')
  const dispatch = useDispatch()

  // Check if screen size is medium or larger to show sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrLargerScreen(window.innerWidth >= 768)
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Function to handle API calls (POST for first section, PATCH for others)
  const submitFormData = async (data: Partial<typeof formData>) => {
    setIsNextLoading(true)
    try {
      if (currentSection === 1) {
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/data/organizationprofile/organizationcreate-patch`,
            {
              ...data,
              orgId: orgId,
              userId: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => {
            dispatch(setUserPlan(response.data.plan.plan_name))
            setIsNextLoading(false)
          })
      } else {
        await axios
          .patch(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/data/organizationprofile/organizationedit/${orgId}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => {
            setIsNextLoading(false)
            setSubmittedData((prev) => ({ ...prev, [currentSection]: data }))
          })
      }
    } catch (error) {
      toast.error('Error submitting form data', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  // Function to handle "Continue" button
  const handleContinue = async (data: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }))
    const isDataChanged =
      JSON.stringify(submittedData[currentSection] || {}) !==
      JSON.stringify(data)

    //API CALL
    if (isDataChanged) {
      await submitFormData(data)
    }

    const nextSection = currentSection + 1
    if (nextSection <= 5) {
      if (!isNextLoading) {
        setCurrentSection(nextSection)
        if (!visitedSections.includes(nextSection)) {
          setVisitedSections([...visitedSections, nextSection])
        }
      }
    } else {
      if (!isNextLoading) {
        navigate('/new-presentation')
      }
    }
  }

  // Function to handle "Back" button
  const handleBack = () => {
    const prevSection = currentSection - 1
    if (prevSection >= 1) {
      setCurrentSection(prevSection)
      setVisitedSections(
        visitedSections.filter((section) => section <= prevSection)
      )
    }
  }

  // Function to render the appropriate form component
  const renderSectionContent = () => {
    switch (currentSection) {
      case 1:
        return (
          <CompanyNameForm
            onContinue={handleContinue}
            initialData={formData.companyName}
            isNextLoading={isNextLoading}
          />
        )
      case 2:
        return (
          <LogoForm
            onContinue={handleContinue}
            onBack={handleBack}
            initialData={formData.logo}
            isNextLoading={isNextLoading}
          />
        )
      case 3:
        return (
          <WebsiteLinkForm
            onContinue={handleContinue}
            onBack={handleBack}
            initialData={formData.websiteLink}
            isNextLoading={isNextLoading}
          />
        )
      case 4:
        return (
          <IndustryForm
            onContinue={handleContinue}
            onBack={handleBack}
            isNextLoading={isNextLoading}
            initialData={{
              sector: formData.sector,
              industry: formData.industry,
            }}
          />
        )
      case 5:
        return (
          <ContactDetailsForm
            onContinue={handleContinue}
            onBack={handleBack}
            isNextLoading={isNextLoading}
            initialData={{
              contactEmail: formData.contactEmail,
              contactPhone: formData.contactPhone,
              linkedinLink: formData.linkedin,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Progress Bar for Small and Medium Screens */}
      {!isMediumOrLargerScreen && (
        <div className="flex  justify-between p-4">
          {[1, 2, 3, 4, 5].map((section) => (
            <div
              key={section}
              className={`h-1 flex-1 mx-1 ${
                currentSection >= section ? 'bg-[#3667B2]' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar for Medium and Larger Screens */}
        {isMediumOrLargerScreen && (
          <Sidebar
            lastVisitedSection={currentSection}
            visitedSections={visitedSections}
          />
        )}

        {/* Onboarding Content */}
        <div className="flex-1 flex items-center justify-center w-full lg:mt-2  xl:mt-4 bg-white">
          {renderSectionContent()}
        </div>
      </div>
    </>
  )
}

export default OnboardingContainer
