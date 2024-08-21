import React from "react";

const Product = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="productOverview"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          Can you provide an overview of the products and services your company
          offers?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="productOverview"
          name="productOverview"
          value={formData.productOverview}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Product
