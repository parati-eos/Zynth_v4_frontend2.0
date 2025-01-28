import uploadFileToS3 from '../../../utils/uploadFileToS3'
import React, { useEffect, useState } from 'react'
import { FaImage, FaBullseye } from 'react-icons/fa'
import { LogoFormProps } from '../../../types/onboardingTypes'
import { BackButton, NextButton } from '../shared/Buttons'
import { toast } from 'react-toastify'
import removeBackground from '../../../utils/removeBG'

const LogoForm: React.FC<LogoFormProps> = ({
  onContinue,
  onBack,
  initialData,
  isNextLoading,
}) => {
  const [logo, setLogo] = useState<string | null>(initialData)
  const [isUploading, setIsUploading] = useState(false)

  // Update URL preview if initialData changes
  useEffect(() => {
    if (initialData) {
      setLogo(initialData)
    }
  }, [initialData])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Validation logic
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
      const maxSize = 5 * 1024 * 1024 // 5 MB
      const validType = allowedTypes.includes(file.type)
      const validSize = file.size <= maxSize

      if (!validType) {
        toast.error('Invalid file type. Please upload a PNG or JPEG image.', {
          position: 'top-right',
          autoClose: 3000,
        })
        return
      }

      if (!validSize) {
        toast.error('File size exceeds 5 MB. Please upload a smaller file.', {
          position: 'top-right',
          autoClose: 3000,
        })
        return
      }
      setIsUploading(true) // Indicate uploading

      try {
        // Upload file to S3 and get the URL
        console.log('File selected:', file)
        const processedFile = await removeBackground(file)
        const processedLogo = {
          name: processedFile.name,
          type: processedFile.type,
          body: processedFile,
        }
        const url = await uploadFileToS3(processedLogo)
        setLogo(url)
      } catch (error) {
        toast.error('Error uploading logo', {
          position: 'top-right',
          autoClose: 3000,
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleButtonClick = () => {
    document.getElementById('companyLogo')?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (logo) {
      onContinue({ logo }) // Send URL to parent on form submit
    }
  }

  return (
    <div className="lg:p-0 p-2 w-full mt-[4rem] xl:mt-[2rem] 2xl:mt-[3rem] md:h-[90%] md:w-[80%] md:bg-white md:shadow-lg md:rounded-3xl md:flex md:flex-col md:justify-between md:p-4">
      {/* Heading */}
      <div className="flex flex-col items-center gap-1 lg:mb-8">
        <FaBullseye className="text-[#3667B2] lg:text-4xl text-6xl xl:text-6xl mb-2" />
        <h1 className="text-2xl text-[#091220] font-bold mb-1">Company Logo</h1>
        <p className="text-[#5D5F61]">Upload your company logo</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center flex-grow w-full max-w-sm mx-auto"
      >
        {/* Input */}
        <div
          className={`w-full border border-gray-200 mt-4 md:mt-9 ${
            logo !== '' ? 'md:mt-0' : ''
          } p-7 rounded-lg hover:scale-105`}
        >
          <input
            type="file"
            id="companyLogo"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            {logo ? (
              <img
                src={logo}
                alt="Uploaded Logo"
                className="w-16 h-16 lg:w-24 lg:h-24 object-fit mb-2"
              />
            ) : (
              <>
                <FaImage className="text-gray-500 text-4xl mb-4" />
                <p className="text-gray-500 mb-4">
                  {isUploading ? 'Uploading...' : 'Upload Your Logo'}
                </p>
              </>
            )}
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-4 py-2 border font-semibold rounded-xl text-gray-500 hover:bg-[#3667B2] hover:border-none hover:text-white transition"
            >
              {logo ? 'Upload Again' : 'Upload Logo'}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div
          className={`flex flex-col items-center justify-center mt-[3.5rem] md:mt-7 ${
            logo !== '' ? 'md:mt-1' : ''
          } w-full space-y-2 `}
        >
          {/* Next Button or Loader */}
          {isNextLoading ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <NextButton disabled={!logo} text={'Next'} />
          )}

          {/* Back Button */}
          <BackButton onClick={onBack} />
        </div>
      </form>
    </div>
  )
}

export default LogoForm
