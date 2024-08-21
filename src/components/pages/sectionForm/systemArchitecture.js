import React from "react";

const TechnicalArchitecture = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="technicalArchitecture"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
           Can you provide a high-level overview of the technical architecture of
           your product or service? *
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="technicalArchitecture"
          name="technicalArchitecture"
          value={formData.technicalArchitecture}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default TechnicalArchitecture;