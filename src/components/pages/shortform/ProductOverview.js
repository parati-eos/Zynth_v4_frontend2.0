import React from 'react'

export default function ProductOverview({ formData, handleChange }) {
  return (
    <div>
            <div className="textInputQuestions">
        <label htmlFor="productOverview">
          Can you provide an overview of the products and services your company
          offers?*
        </label>
        <textarea style={{ height: "250px" }}
          id="productOverview"
          name="productOverview"
          value={formData.productOverview}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  )
}
