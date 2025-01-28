import React, { useEffect, useState } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { WebsiteLinkFormProps } from '../../../types/onboardingTypes'
import { NextButton, BackButton } from '../shared/Buttons'

const WebsiteLinkForm: React.FC<WebsiteLinkFormProps> = ({
  onContinue,
  onBack,
  initialData,
  isNextLoading,
}) => {
  const [websiteLink, setWebsiteLink] = useState(initialData)
  const [isValidLink, setIsValidLink] = useState(false)

  useEffect(() => {
    setWebsiteLink(initialData)
    validateLink(initialData) // Validate the initial data if provided
  }, [initialData])

  const validateLink = (link: string | undefined) => {
    if (!link) {
      setIsValidLink(false)
      return
    }
    // Regular expression to validate a URL
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
    setIsValidLink(urlRegex.test(link))
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!websiteLink) {
      setWebsiteLink('https://') // Pre-fill "https://" if empty
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValue = e.target.value

    // Allow backspace to completely clear the input
    if (updatedValue === '') {
      setWebsiteLink('') // Allow clearing the field
      validateLink('') // Validate empty value
      return
    }

    setWebsiteLink(updatedValue) // Update website link state
    validateLink(updatedValue) // Call validation
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidLink && websiteLink) {
      onContinue({ websiteLink })
    }
  }

  return (
    <div className="lg:p-0 p-2 w-full mt-[4rem] xl:mt-[2rem] 2xl:mt-[3rem] md:h-[90%] md:w-[80%] md:bg-white md:shadow-lg md:rounded-3xl md:flex md:flex-col md:justify-between md:p-4">
      {/* Heading */}
      <div className="flex flex-col items-center gap-1 lg:mb-8">
        <FaGlobe className="text-[#3667B2] lg:text-4xl text-6xl xl:text-6xl mb-2" />
        <h1 className="text-2xl text-[#091220] font-bold mb-1">Website Link</h1>
        <p className="text-[#5D5F61]">Provide your website link</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center flex-grow w-full max-w-sm mx-auto"
      >
        {/* Input */}
        <div className="w-full mt-[4.2rem] md:mt-12 xl:mb-[7rem] lg:mb-[9.5rem] ">
          <label
            htmlFor="websiteLink"
            className="mb-3 font-semibold text-[#4A4B4D] block text-left"
          >
            Website Link
          </label>
          <input
            type="text"
            id="websiteLink"
            placeholder="Enter website link"
            className="mb-7 lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2]"
            value={websiteLink}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {!isValidLink && websiteLink && (
            <p className="text-red-500 text-sm mt-2">
              Please enter a valid website link.
            </p>
          )}
        </div>

        {/* Buttons */}
        {/* Buttons */}
        <div className="flex flex-col items-center justify-center  xl:mt-0 md:mt-4 w-full space-y-2 mt-[3.5rem]">
          {/* Next Button or Loader */}
          {isNextLoading ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <NextButton disabled={!isValidLink} text={'Next'} />
          )}

          {/* Back Button */}
          <BackButton onClick={onBack} />
        </div>
      </form>
    </div>
  )
}

export default WebsiteLinkForm
