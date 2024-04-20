import React, { useState, useEffect } from "react";

export default function () {
  const [productsCount, setProductsCount] = useState(0);
  const [webTemplatesCount, setWebTemplatesCount] = useState(0);
  const [mobileTemplatesCount, setMobileTemplatesCount] = useState(0);

  useEffect(() => {
    const productInterval = setInterval(() => {
      // Define the rate at which the product count increases
      const productIncrement = 1;

      // Increment product count
      setProductsCount((prevCount) =>
        prevCount < 6 ? prevCount + productIncrement : 6
      );
    }, 600); // Adjust the interval for product count animation

    // Clear product interval on component unmount
    return () => clearInterval(productInterval);
  }, []);

  useEffect(() => {
    const webTemplateInterval = setInterval(() => {
      // Define the rate at which the web template count increases
      const webTemplateIncrement = 1;

      // Increment web template count
      setWebTemplatesCount((prevCount) =>
        prevCount < 100 ? prevCount + webTemplateIncrement : 100
      );
    }, 60); // Interval for web template count

    // Clear web template interval on component unmount
    return () => clearInterval(webTemplateInterval);
  }, []);

  useEffect(() => {
    const mobileTemplateInterval = setInterval(() => {
      // Define the rate at which the mobile template count increases
      const mobileTemplateIncrement = 1;

      // Increment mobile template count
      setMobileTemplatesCount((prevCount) =>
        prevCount < 500 ? prevCount + mobileTemplateIncrement : 500
      );
    }, 10); // Interval for mobile template count

    // Clear mobile template interval on component unmount
    return () => clearInterval(mobileTemplateInterval);
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden ">
      <img
        className="absolute top-0 right-0 md:mt-10 -mr-20 md:-mr-0"
        src="saturn-assets/images/stats/star-dark.svg"
        alt=""
      />
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl mt-20  md:text-4xl font-bold text-white opacity-100">
            Extensive Experience with
            <br />
            <span style={{ color: "#e6a500" }}>
              Investor Relations and Pitch Decks
            </span>
          </h1>
          <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200 opacity-70">
            Zynth is the culmination of years of experience in building pitch
            decks for early and growth-stage startups, conducting market
            research, developing business plans, and financial modelling.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="relative w-full md:w-1/3 px-4 pb-9 md:pb-0 mb-12 lg:mb-0">
              <div className="hidden md:block absolute top-1/2 right-0 w-px h-28 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="md:hidden absolute bottom-0 left-1/2 h-px w-40 bg-gray-200 transform -translate-x-1/2"></div>
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-gray-50 mb-5">
                  {productsCount}
                </span>
                <span className="text-xl text-gray-200">Years</span>
              </div>
            </div>
            <div className="relative w-full md:w-1/3 px-4 pb-9 md:pb-0 mb-12 lg:mb-0">
              <div className="hidden md:block absolute top-1/2 right-0 w-px h-28 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="md:hidden absolute bottom-0 left-1/2 h-px w-40 bg-gray-200 transform -translate-x-1/2"></div>
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-gray-50 mb-5">
                  {webTemplatesCount}
                </span>
                <span className="text-xl text-gray-200">Partners</span>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-gray-50 mb-5">
                  {mobileTemplatesCount}
                </span>
                <span className="text-xl text-gray-200">Pitch Decks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}