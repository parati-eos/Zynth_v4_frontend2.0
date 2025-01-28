import React from 'react'

interface NextButtonProps {
  disabled?: boolean
  text: string
}

export const NextButton: React.FC<NextButtonProps> = ({
  disabled = false,
  text,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`px-6 py-2 rounded-xl lg:h-[2.8rem] h-[3.3rem] active:scale-95 transform duration-300 transition w-full ${
        disabled
          ? 'bg-[#E6EAF0] text-[#797C81] cursor-not-allowed'
          : 'bg-[#3667B2] text-white hover:bg-[#0A8568]'
      }`}
    >
      {text}
    </button>
  )
}

interface BackButtonProps {
  onClick: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-2 h-[3.3rem] lg:h-[2.7rem] border border-[#8A8B8C] hover:bg-[#3667B2] hover:border-[#2d599c] hover:text-white rounded-xl active:scale-95 active:bg-blue-800 transition transform duration-300 w-full text-[#797C81]"
    >
      Back
    </button>
  )
}
