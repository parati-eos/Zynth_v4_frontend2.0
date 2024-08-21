import React from "react";

const Case = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="caseStudies"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          Could you provide examples of successful case studies from your
          clients, showcasing how your products or services have made a positive
          impact on their businesses? *
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="caseStudies"
          name="caseStudies"
          value={formData.caseStudies}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Case;
