import React from "react";

const CustomerPersona = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="customerPersona"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
        Describe your customer persona in terms of their demographic, and behavioral characteristics such as age, gender, location, income level, interests, etc.
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="customerPersona"
          name="customerPersona"
          value={formData.customerPersona}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default CustomerPersona;
