import React from "react";

const About = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="companyOverview"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          Could you provide a comprehensive overview of your company?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="companyOverview"
          name="companyOverview"
          value={formData.companyOverview}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default About;
