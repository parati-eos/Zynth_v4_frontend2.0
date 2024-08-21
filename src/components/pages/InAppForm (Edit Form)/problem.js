import React from "react";

const Problem = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="problemDescription"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
            What inspired the establishment of your startup, and what specific
          problems do you aim to solve with your products or services in the
          market?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="problemDescription"
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default Problem;
