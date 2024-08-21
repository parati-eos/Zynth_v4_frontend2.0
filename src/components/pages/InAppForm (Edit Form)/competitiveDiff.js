import React from "react";

const CompetitiveDiff = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="competitiveDiff"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
          What factors differentiate your products or services from those of
          your key competitors?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="competitiveDiff"
          name="competitiveDiff"
          value={formData.competitiveDiff}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default CompetitiveDiff;
