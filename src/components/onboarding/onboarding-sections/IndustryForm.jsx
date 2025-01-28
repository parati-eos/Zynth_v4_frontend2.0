import React, { useEffect, useState } from 'react'
import { FaCity } from 'react-icons/fa'
import { IndustryFormProps } from '../../../types/onboardingTypes'
import { BackButton, NextButton } from '../shared/Buttons'
import { industrySectorMap } from '../../../utils/industrySector'

type SectorType = keyof typeof industrySectorMap

const IndustryForm: React.FC<IndustryFormProps> = ({
  onContinue,
  onBack,
  initialData,
  isNextLoading,
}) => {
  const [sector, setSector] = useState(initialData.sector)
  const [industry, setIndustry] = useState(initialData.industry)
  const [otherSector, setOtherSector] = useState<string>('')
  const [otherIndustry, setOtherIndustry] = useState<string>('')
  const [industryOptions, setIndustryOptions] = useState<string[]>([])

  // Set sector and industry based on initialData
  useEffect(() => {
    if (
      !Object.keys(industrySectorMap).includes(initialData.sector) &&
      initialData.sector
    ) {
      setSector('Other')
      setOtherSector(initialData.sector)
    } else {
      setSector(initialData.sector)
    }

    if (
      !Object.values(industrySectorMap).flat().includes(initialData.industry) &&
      initialData.industry
    ) {
      setIndustry('Other')
      setOtherIndustry(initialData.industry)
    } else {
      setIndustry(initialData.industry)
    }
  }, [initialData])

  useEffect(() => {
    if (sector && sector !== 'Other' && sector in industrySectorMap) {
      setIndustryOptions([...industrySectorMap[sector as SectorType], 'Other'])
    }

    // Automatically set industry to "Other" if sector is "Other"
    if (sector === 'Other') {
      setIndustry('Other')
      setOtherIndustry('') // Reset otherIndustry input
    }
  }, [sector])

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as SectorType // Cast to SectorType
    setSector(selectedValue)
    if (selectedValue === 'Other') {
      setOtherSector('')
      setOtherIndustry('')
    }
  }

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setIndustry(selectedValue)
    if (selectedValue !== 'Other') {
      setOtherIndustry('') // Clear otherIndustry input
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sectorData = sector === 'Other' ? otherSector : sector
    const industryData = industry === 'Other' ? otherIndustry : industry

    if (sectorData && industryData) {
      onContinue({
        sector: sectorData,
        industry: industryData,
      })
    }
  }

  const isNextButtonDisabled =
    !sector ||
    !industry || // Ensure sector and industry are selected
    (sector === 'Other' && !otherSector) || // Validate otherSector input
    (industry === 'Other' && !otherIndustry) // Validate otherIndustry input

  return (
    <div className="w-full mt-[4rem] xl:mt-[2rem] 2xl:mt-[3rem] md:h-[90%] md:w-[80%] md:bg-white md:shadow-lg md:rounded-3xl md:flex md:flex-col md:justify-between p-2 md:p-4">
      {/* Heading */}
      <div className="flex flex-col items-center gap-1 lg:mb-8">
        <FaCity className="text-[#3667B2] lg:text-4xl text-6xl xl:text-6xl mb-2" />
        <h1 className="text-2xl text-[#091220] font-bold mb-1">
          Your Industry
        </h1>
        <p className="text-[#5D5F61]">
          Provide details about sector and industry
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center flex-grow w-full  md:max-w-screen-xl mx-auto"
      >
        {/* Input */}
        <div
          className={`w-full lg:flex lg:justify-center lg:gap-x-4 mt-[0.5rem] lg:w-[70%] ${
            sector === 'Other' || industry === 'Other' ? 'md:mt-8' : ''
          } px-2 scrollbar-none`}
          style={{
            maxHeight: '25vh', // Prevent container from growing beyond 70% of the viewport
            overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
            WebkitOverflowScrolling: 'touch', // Smooth scrolling for iOS
          }}
        >
          <div className="flex flex-col w-full ">
            <label
              htmlFor="sector"
              className="mb-3 font-semibold text-[#4A4B4D] block text-left "
            >
              Sector
            </label>
            <select
              id="sector"
              value={sector}
              onChange={handleSectorChange}
              className="mb-2 lg:p-2 p-3 border w-full rounded-xl"
            >
              <option value="" disabled>
                Select sector
              </option>
              {Object.keys(industrySectorMap).map((sectorKey) => (
                <option key={sectorKey} value={sectorKey}>
                  {sectorKey}
                </option>
              ))}
            </select>
            {sector === 'Other' && (
              <input
                type="text"
                placeholder="Enter your sector"
                className="lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2]"
                value={otherSector}
                onChange={(e) => setOtherSector(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="industry"
              className="mb-3 font-semibold text-[#4A4B4D] block text-left"
            >
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={handleIndustryChange}
              className="mb-2 lg:p-2 p-3 border w-full rounded-xl"
              disabled={!sector || sector === 'Other'}
            >
              {sector !== 'Other' && (
                <option value="" disabled>
                  Select industry
                </option>
              )}
              {sector === 'Other' && (
                <option value="" disabled>
                  Other
                </option>
              )}
              {industryOptions.map((industryOption) => (
                <option key={industryOption} value={industryOption}>
                  {industryOption}
                </option>
              ))}
            </select>
            {(industry === 'Other' || sector === 'Other') && (
              <input
                type="text"
                placeholder="Enter your industry"
                className="lg:p-2 p-4 border w-full rounded-xl outline-[#3667B2] "
                value={otherIndustry}
                onChange={(e) => setOtherIndustry(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        {/* Buttons */}
        <div
          className={`flex flex-col items-center justify-center max-w-sm mt-14 ${
            sector === 'Other' || industry === 'Other'
              ? 'lg:mt-[10.7rem] xl:mt-[6.9rem] '
              : 'lg:mt-[14.7rem] xl:mt-[10.9rem]'
          } w-full space-y-2`}
        >
          {/* Next Button or Loader */}
          {isNextLoading ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <NextButton disabled={isNextButtonDisabled} text={'Next'} />
          )}

          {/* Back Button */}
          <BackButton onClick={onBack} />
        </div>
      </form>
    </div>
  )
}

export default IndustryForm
