import React, { useEffect, useState } from 'react'
import { FaPhone } from 'react-icons/fa'
import { ContactDetailsFormProps } from '../../../types/onboardingTypes'
import { BackButton, NextButton } from '../shared/Buttons'

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  onContinue,
  onBack,
  initialData,
  isNextLoading,
}) => {
  const [contactEmail, setContactEmail] = useState(
    initialData.contactEmail || ''
  )
  const [contactPhone, setContactPhone] = useState(
    initialData.contactPhone || ''
  )
  const [linkedinLink, setLinkedinLink] = useState(
    initialData.linkedinLink || ''
  )
  const [isLinkedinValid, setIsLinkedinValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(true)

  useEffect(() => {
    setContactEmail(initialData.contactEmail || '')
    setContactPhone(initialData.contactPhone || '')
    setLinkedinLink(initialData.linkedinLink || '')
  }, [initialData])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setContactEmail(value)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    setIsEmailValid(value === '' || emailRegex.test(value)) // Valid if empty or matches regex
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
  
    // Remove all non-numeric characters
    value = value.replace(/\D/g, '');
  
    // Prevent leading zeros
    if (value.startsWith('0')) {
      value = value.substring(1);
    }
  
    // Limit the input to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
  
    setContactPhone(value);
  
    // Validate the phone number (exactly 10 digits)
    const phoneRegex = /^[1-9]\d{9}$/;
    setIsPhoneValid(phoneRegex.test(value));
  };

  const handleLinkedinFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!linkedinLink) {
      setLinkedinLink("https://"); // Pre-fill "https://" only if input is empty
    }
  };
  
  const handleLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Allow backspace to clear the input
    if (value === "") {
      setLinkedinLink(""); // Allow user to completely clear input
      return;
    }
  
    
  
    const linkedinRegex =
      /^https:\/\/(www\.)?linkedin\.com\/(in|company|pub)\/[a-zA-Z0-9_-]{3,}\/?$/;
  
    setIsLinkedinValid(linkedinRegex.test(value)); // Validate LinkedIn URL
    setLinkedinLink(value); // Update state
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue({ contactEmail, contactPhone, linkedinLink })
  }

  // Form is valid if all filled fields are valid or all fields are empty
  const isFormValid =
    (contactEmail === '' && contactPhone === '' && linkedinLink === '') || // All empty
    ((contactEmail === '' || isEmailValid) &&
      (contactPhone === '' || isPhoneValid) &&
      (linkedinLink === '' || isLinkedinValid)) // At least one filled and valid

  return (
  
         <div className="lg:p-0 p-2 w-full mt-[4rem] xl:mt-[2rem] 2xl:mt-[3rem] md:h-[90%] md:w-[80%] md:bg-white md:shadow-lg md:rounded-3xl md:flex md:flex-col md:items-center md:justify-center md:p-4">
            {/* Heading */}
            <div className="flex flex-col items-center gap-1 lg:mb-8">
            <FaPhone className="text-[#3667B2] lg:text-4xl text-5xl xl:text-6xl mb-2" />
        <h1 className="text-2xl text-[#091220] font-bold mb-1">
          Contact Details
        </h1>
        <p className="text-[#5D5F61]">Provide your contact details</p>
            </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center flex-grow w-full max-w-sm mx-auto mb-4"
      >
        {/* Email */}
        <div className="w-full mt-4 lg:mt-0 ">
          <label
            htmlFor="email"
            className="mb-3 font-semibold text-[#4A4B4D] block text-left"
          >
            Company Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            className={`mb-4 lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2] ${
              !isEmailValid ? 'border-red-500' : ''
            }`}
            value={contactEmail}
            onChange={handleEmailChange}
          />
          {!isEmailValid && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address.
            </p>
          )}

          {/* Phone */}
          <label
            htmlFor="phone"
            className="mb-3 font-semibold text-[#4A4B4D] block text-left"
          >
            Company Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            className={`mb-4 lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2] ${
              !isPhoneValid && contactPhone.length !== 0  ? 'border-red-500' : ''
            }`}
            value={contactPhone}
            onChange={handlePhoneChange}
          />
          {!isPhoneValid && contactPhone.length !== 0 &&(
            <p className="text-red-500 text-sm">
              Please enter a valid phone number. Remove 0 from the start if
              present.
            </p>
          )}

          {/* LinkedIn */}
          <label
            htmlFor="linkedin"
            className="mb-3 font-semibold text-[#4A4B4D] block text-left"
          >
            Company LinkedIn
          </label>
          <input
            type="text"
            id="linkedin"
            placeholder="Link of your LinkedIn profile"
            className={`mb-4 lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2] ${
              !isLinkedinValid && linkedinLink.length !== 0 ? 'border-red-500' : ''
            }`}
            value={linkedinLink}
            onFocus={handleLinkedinFocus} // Add "https://" on focus
  onChange={handleLinkedinChange}
          />
          {!isLinkedinValid && linkedinLink.length !== 0 && (
            <p className="text-[#FF0000] text-sm text-left">
              Please enter a valid LinkedIn URL
            </p>
          )}
        </div>

        {/* Buttons */}
       {/* Buttons */}
<div className="flex flex-col items-center justify-center w-full space-y-2 lg:mt-0">
  {/* Next Button or Loader */}
  {isNextLoading ? (
    <div className="w-full flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  ) : (
    <NextButton text="Finish" disabled={!isFormValid} />
  )}

  {/* Back Button */}
  <BackButton onClick={onBack} />
</div>

      </form>
    </div>
  )
}

export default ContactDetailsForm
