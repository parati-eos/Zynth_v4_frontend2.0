import React from 'react'

export default function Customa_Persona({formData, handleChange}) {
  return (
    <div>
       <div className="textInputQuestions">
        <label htmlFor="customerPersona">
          Describe your customer persona in terms of their demographic, and
          behavioral characteristics such as age, gender, location, income
          level, interests, etc.
        </label>
        <textarea
          id="customerPersona"
          name="customerPersona"
          value={formData.customerPersona}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  )
}
