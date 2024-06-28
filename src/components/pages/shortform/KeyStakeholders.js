import React from 'react'

export default function KeyStakeholders({formData, handleChange}) {
  return (
    <div>
          <div className="textInputQuestions">
        <label htmlFor="keyStakeholders">
          Who are the key stakeholders of your business and how do they benefit
          from it? List at least 2 of them.*
        </label>
        <textarea
          id="keyStakeholders"
          name="keyStakeholders"
          value={formData.keyStakeholders}
          onChange={handleChange}
          required
        ></textarea>
      </div>
    </div>
  )
}

