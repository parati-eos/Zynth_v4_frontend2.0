import React from "react";

const Solution = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="solutionsDescription"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
            What solutions is your company offering to address the identified
            problems for the target market?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="solutionsDescription"
          name="solutionsDescription"
          value={formData.solutionsDescription}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Solution;
