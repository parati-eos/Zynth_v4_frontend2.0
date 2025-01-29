import React, { useEffect, useRef } from 'react'
import '../css/presentationshare.css'

const ShareSidebar = ({ onOutlineSelect, selectedOutline, outlines }) => {
  const outlineRefs = useRef([])

  // Scroll to the selected outline and ensure it is visible in the shareSidebar
  useEffect(() => {
    if (selectedOutline) {
      const selectedIndex = outlines.findIndex(
        (outline) => outline === selectedOutline
      )
      const selectedRef = outlineRefs.current[selectedIndex]

      if (selectedRef) {
        selectedRef.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }
  }, [selectedOutline, outlines])
  return (
    <div className="desktop-view share-no-no-scrollbar share-no-no-scrollbar::-webkit-scrollbar w-[22%] h-[84.5vh] p-4 bg-[#17191a] ml-4 rounded-xl border border-[#17191a] overflow-y-auto">
      <ul className="space-y-2 relative">
        {outlines.map((outline, idx) => (
          <div key={idx}>
            <li
              ref={(el) => (outlineRefs.current[idx] = el)}
              className="relative group"
            >
              {/* Outline Title */}
              <button
                onClick={() => onOutlineSelect(outline)}
                className={`w-full max-w-xs font-normal text-left p-2 rounded-lg flex justify-between ${
                  selectedOutline === outline
                    ? ' text-[#75c2ee]'
                    : 'hover:bg-[#3667B2] text-white'
                }`}
              >
                <span>{`${idx + 1}. ${outline}`}</span>
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ShareSidebar
