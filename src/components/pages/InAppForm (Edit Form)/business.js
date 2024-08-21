import React from "react";

const Business = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="businessModel"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          What is your business model? Please describe your revenue streams.*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="businessModel"
          name="businessModel"
          value={formData.businessModel}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Business;
