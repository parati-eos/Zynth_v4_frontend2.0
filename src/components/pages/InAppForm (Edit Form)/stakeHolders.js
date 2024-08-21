import React from "react";

const Stakeholders = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="keyStakeholders"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
        Who are the key stakeholders of your business and how do they benefit
        from it? List at least 2 of them.*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="keyStakeholders"
          name="keyStakeholders"
          value={formData.keyStakeholders}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Stakeholders;
