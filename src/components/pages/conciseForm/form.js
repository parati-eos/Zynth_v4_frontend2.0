// src/components/ConciseForm.js
import React, { useState, useEffect } from 'react'
import Section from './Section'
import LogoSection from './logoSection'
import IndustrySection from './IndustrySection'
import OverviewSection from './overviewSection'
import Navbar from '../../shared/js/LoginNavbar'
import ProgressBar from './progressBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import uploadFileToS3 from '../utils/uploadFileToS3'
import removeBackground from '../utils/removeBackground'
import CircularProgress from '@mui/material/CircularProgress'
import './form.css'
import ContactSection from './contactus'

const steps = {
  COMPANY_NAME: 1,
  WEBSITE: 2,
  LOGO: 3,
  TAGLINE: 4,
  INDUSTRY: 5,
  ABOUT_COMPANY: 6,
  PRODUCT_SERVICE: 7,
  CONTACT: 8,
}

const generateFormId = () => {
  return 'Parati-' + Date.now()
}

const ConciseForm = () => {
  const [step, setStep] = useState(steps.COMPANY_NAME)
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userEmail'),
    companyName: '',
    tagline: '',
    logo: null,
    companyOverview: '',
    sector: '',
    otherSector: '',
    industry: '',
    otherIndustry: '',
    productOverview: '',
    websiteLink: '',
    linkedinLink: '',
    contactEmail: localStorage.getItem('userEmail'),
    contactPhone: '',
    organizationId: '',
  })
  const [formId, setFormId] = useState('')
  const [generatedPresentationID, setgeneratedPresentationID] = useState(null)
  const [logoUrl, setLogoUrl] = useState(formData.logo || null)
  const [isLogoLoading, setIsLogoLoading] = useState(false)
  const submissionID = localStorage.getItem('submissionId')
  const userEmail = localStorage.getItem('userEmail')
  const generatedPresentationId = localStorage.getItem(
    'generatedPresentationId'
  )

  // Generate a new form ID when the component mounts
  useEffect(() => {
    const newFormId = generateFormId()
    localStorage.setItem('submissionId', newFormId)
    setFormId(newFormId)
    console.log('Form ID:', newFormId)
    const userEmail = localStorage.getItem('userEmail')
    console.log('User Email:', userEmail)
  }, [])

  const navigate = useNavigate()
  const handleLogoClicked = () => {
    navigate('/applicationLanding')
  }

  // Validate the current step
  const validateStep = () => {
    switch (step) {
      case steps.COMPANY_NAME:
        return formData.companyName.trim() !== ''
      case steps.LOGO:
        return formData.logo !== null
      case steps.TAGLINE:
        return true
      case steps.ABOUT_COMPANY:
        return formData.companyOverview.trim() !== ''
      case steps.INDUSTRY:
        var temp

        if (formData.sector === 'Other') {
          temp = formData.otherSector.trim() !== ''
        } else {
          temp = formData.sector.trim() !== ''
        }

        if (formData.industry === 'Other') {
          temp = temp && formData.otherIndustry.trim() !== ''
        } else {
          temp = temp && formData.industry.trim() !== ''
        }

        return temp

      case steps.PRODUCT_SERVICE:
        return formData.productOverview.trim() !== ''
      case steps.CONTACT:
        return true
      case steps.WEBSITE:
        return formData.websiteLink.trim() !== ''
      default:
        return false
    }
  }

  // Handle the previous button click
  const handlePrev = () => {
    if (step > steps.COMPANY_NAME) setStep(step - 1)
  }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target

    // For the websiteLink field
    if (name === 'websiteLink' && value) {
      let updatedValue = value

      // Prepend https:// if the value doesn't already start with http or https
      if (
        !updatedValue.startsWith('http://') &&
        !updatedValue.startsWith('https://')
      ) {
        updatedValue = `https://${updatedValue}`
      }

      // Update formData with the modified value
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }))
    }
    // Store organizationId in localStorage
    else if (name === 'organizationId') {
      sessionStorage.setItem('organizationId', value) // Store organizationId in localStorage
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
    // For other fields (like file inputs)
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }))
    }
  }

  useEffect(() => {
    setLogoUrl(formData.logo || null)
  }, [formData.logo])

  const handleBlankSlideGeneration = async () => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxkI-M_N2-FKek3R7PCCE9kDaryGh7O43pDO6Dk3QOoicOwItGETvTH9vXcCPveBmhGCg/exec?submissionID=${formId}&userEmail=${encodeURIComponent(
          userEmail
        )}`
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const responseData = await response.text()
      console.log('API Response:', responseData) // Log the entire response
      setgeneratedPresentationID(responseData)
      localStorage.setItem('generatedPresentationId', responseData)
      const data = JSON.parse(responseData)
      console.log(data + 'is here !')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleLogoChange = async (e) => {
    const file = e.target.files[0]
    setIsLogoLoading(true)
    try {
      console.log('File selected:', file)
      const processedFile = await removeBackground(file)
      console.log('Processed file:', processedFile)

      const uploadedLogoUrl = await uploadFileToS3(processedFile)
      console.log('Uploaded logo URL:', uploadedLogoUrl)

      setLogoUrl(uploadedLogoUrl)
      handleChange({ target: { name: 'logo', value: uploadedLogoUrl } })

      const colors = await fetchColorsFromApi(uploadedLogoUrl)
      if (colors) {
        handleChange({ target: { name: 'primaryColor', value: colors[0] } })
        handleChange({ target: { name: 'secondaryColor', value: colors[1] } })
        handleChange({ target: { name: 'p50s50', value: colors[2] } })
        handleChange({ target: { name: 'p75s25', value: colors[3] } })
        handleChange({ target: { name: 'p25s75', value: colors[4] } })
      }
    } catch (error) {
      console.error('Error uploading logo:', error)
    } finally {
      setIsLogoLoading(false)
    }
  }

  const fetchColorsFromApi = async (imageUrl) => {
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL
      const response = await axios.post(`${serverurl}/get-colors/`, {
        imageUrl,
      })
      const colors = response.data.map((color) => color.hex) // Extract hex values from response
      console.log('Fetched colors:', colors)
      return colors
    } catch (error) {
      console.error('Error fetching colors from API:', error)
      return null
    }
  }

  const handleSubmit = async (e, section) => {
    e.preventDefault()
    const payload = {
      formId: formId,
      formResponses: formData,
      generatedPresentationId: generatedPresentationID,
      section: section,
    }
    if (validateStep()) {
      console.log('API Payload:', payload)
      try {
        const serverurl = process.env.REACT_APP_SERVER_URL
        const response = await fetch(`${serverurl}/submission/short-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const scrapeFunction = async (url) => {
    const data = {
      formId: formId,
      url: url,
    }

    try {
      const serverurl = process.env.REACT_APP_SERVER_URL
      const response = await axios.post(`${serverurl}/scapper/scrapeData`, data)
      console.log('Success:', response.data) // Handle the API response
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      ) // Handle any errors
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (validateStep()) {
      if (step === steps.COMPANY_NAME) {
        handleBlankSlideGeneration()
      } else if (step === steps.TAGLINE) {
        // handleBlankSlideGeneration();
        handleSubmit(e, 'cover')
      } else if (step === steps.ABOUT_COMPANY) {
        handleSubmit(e, 'about')
      } else if (step === steps.INDUSTRY) {
        handleSubmit(e, 'market')
      } else if (step === steps.PRODUCT_SERVICE) {
        handleSubmit(e, 'product')
      } else if (step === steps.WEBSITE) {
        handleSubmit(e, 'website')
        console.log(formData.websiteLink)
        scrapeFunction(formData.websiteLink)
      } else if (step === steps.CONTACT) {
        handleSubmit(e, 'contactInfo')
      }
      step < 8
        ? setStep(step + 1)
        : navigate(`/pages/presentationcheck?submissionID=${submissionID}`)
    } else {
      alert('Field cannot be empty')
    }
  }

  return (
    <div className="conciseform">
      <Navbar handleClick={handleLogoClicked} />
      <div className="concise-form-container">
        <ProgressBar step={step} totalSteps={Object.keys(steps).length} />
        <form onSubmit={handleSubmit}>
          {step === steps.COMPANY_NAME && (
            <Section
              title="Company Name"
              name="companyName"
              value={formData.companyName}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.WEBSITE && (
            <Section
              title="Website"
              name="websiteLink"
              value={formData.websiteLink}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.LOGO && (
            <LogoSection
              name="logo"
              value={formData.logo}
              handleChange={handleLogoChange}
              isLogoLoading={isLogoLoading}
              required
            />
          )}
          {step === steps.TAGLINE && (
            <Section
              title="Company Tagline"
              name="tagline"
              value={formData.tagline}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.ABOUT_COMPANY && (
            <OverviewSection
              title="About the Company"
              name="companyOverview"
              value={formData.companyOverview}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.INDUSTRY && (
            <IndustrySection
              title="Sector and Industry"
              name="sector"
              industry={formData.industry}
              sector={formData.sector}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.PRODUCT_SERVICE && (
            <OverviewSection
              title="Products and Services"
              name="productOverview"
              value={formData.productOverview}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.CONTACT && (
            <ContactSection
              title="Company Links"
              name1="contactPhone"
              value1={formData.contactPhone}
              name2="linkedinLink"
              value2={formData.linkedinLink}
              name3="organizationId" // Use lowercase here to match the formData key
              value3={formData.organizationId}
              handleChange={handleChange}
              required
            />
          )}

          <div className="form-navigation">
            {isLogoLoading ? (
              <CircularProgress sx={{ color: '#5480c1' }} />
            ) : (
              <button
                type="submit"
                onClick={handleNext}
                disabled={step === steps.LOGO && isLogoLoading}
              >
                {step === steps.CONTACT ? 'Submit' : 'Next'}
              </button>
            )}
            {step > steps.COMPANY_NAME && (
              <button type="button" onClick={handlePrev}>
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConciseForm
