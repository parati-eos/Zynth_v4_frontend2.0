import React from "react";

const GTM = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="goToMarketStrategy"
          className="block text-[3vw] md:text-[1.2vw] font-medium text-white"
        >
      What are the key components of your Go-to-Market strategy, including
      your approach to product positioning?*
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-transparent text-[3vw] md:text-[1.2vw]"
          id="goToMarketStrategy"
          name="goToMarketStrategy"
          value={formData.goToMarketStrategy}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
    </>
  );
};

export default GTM;
