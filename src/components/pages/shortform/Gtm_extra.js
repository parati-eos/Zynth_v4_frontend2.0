import React from 'react'

export default function Gtm_extra({formData, handleChange}) {
  return (
    <div>
        <div className="textInputQuestions">
        <label htmlFor="goToMarketStrategy">
          What are the key components of your Go-to-Market strategy, including
          your approach to product positioning?*
        </label>
        <textarea
          id="goToMarketStrategy"
          name="goToMarketStrategy"
          value={formData.goToMarketStrategy}
          onChange={handleChange}
          required
        ></textarea>
      </div>
    </div>
  )
}
