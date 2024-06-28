import React from 'react'

export default function Product_Roadmap({formData, handleChange}) {
  return (
    <div>
     <div className="textInputQuestions">
        <label htmlFor="productRoadmapDescription">
          Do you have a product roadmap in place? If yes, please describe your
          product roadmap.
        </label>
        <textarea
          id="productRoadmapDescription"
          name="productRoadmapDescription"
          value={formData.productRoadmapDescription}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
