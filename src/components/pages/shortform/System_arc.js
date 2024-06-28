import React from 'react'

export default function System_arc({formData, handleChange}) {
  return (
    <div>
       <div className="textInputQuestions">
        <label htmlFor="technicalArchitecture">
          Can you provide a high-level overview of the technical architecture of
          your product or service?
        </label>
        <textarea
          id="technicalArchitecture"
          name="technicalArchitecture"
          value={formData.technicalArchitecture}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
