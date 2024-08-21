import React from "react";

const ProductRoadMap = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="productRoadmapDescription"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          Do you have a product roadmap in place? If yes, please describe your
          product roadmap.
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="productRoadmapDescription"
          name="productRoadmapDescription"
          value={formData.productRoadmapDescription}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default ProductRoadMap
