import React, { useState, useEffect, useRef } from "react";

export default function CounterSection() {
  const [productsCount, setProductsCount] = useState(0);
  const [webTemplatesCount, setWebTemplatesCount] = useState(0);
  const [mobileTemplatesCount, setMobileTemplatesCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const startCounters = () => {
    const productInterval = setInterval(() => {
      setProductsCount((prevCount) => {
        if (prevCount < 6) {
          return prevCount + 1;
        } else {
          clearInterval(productInterval);
          return prevCount;
        }
      });
    }, 600);

    const webTemplateInterval = setInterval(() => {
      setWebTemplatesCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(webTemplateInterval);
          return prevCount;
        }
      });
    }, 40);

    const mobileTemplateInterval = setInterval(() => {
      setMobileTemplatesCount((prevCount) => {
        if (prevCount < 1000) {
          return prevCount + 1;
        } else {
          clearInterval(mobileTemplateInterval);
          return prevCount;
        }
      });
    }, 1);

    return () => {
      clearInterval(productInterval);
      clearInterval(webTemplateInterval);
      clearInterval(mobileTemplateInterval);
    };
  };

  const formatCount = (count, max) => {
    return count >= max ? `${count}+` : count;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-5 md:py-5 overflow-hidden bg-stone-200 pb-32"
    >
      <img
        className="absolute top-0 right-0 md:mt-10 -mr-20 md:-mr-0"
        src="saturn-assets/images/stats/star-dark.svg"
        alt=""
      />
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl mt-20 text-center md:text-4xl font-bold text-[#002d41] opacity-100">
            Extensive Experience with
            <br />
            <span style={{ color: "#e6a500" }}>
              Investor Relations and Pitch Decks
            </span>
          </h1>
          <p className="text-center mb-10 text-base md:text-xl mt-8 text-[#002d41] text-[18px]">
            Zynth is the culmination of years of experience in building pitch
            decks for early and growth-stage startups, conducting market
            research, developing business plans, and financial modelling.
          </p>
          <div className="flex flex-wrap -mx-4">
            <div className="relative w-full md:w-1/3 px-4 pb-9 md:pb-0 mb-12 lg:mb-0">
              <div className="hidden md:block absolute top-1/2 right-0 w-px h-28 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="md:hidden absolute bottom-0 left-1/2 h-px w-40 bg-gray-200 transform -translate-x-1/2"></div>
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-[#002d41] mb-5">
                  {formatCount(productsCount, 6)}
                </span>
                <span className="text-xl text-[#002d41]">Years</span>
              </div>
            </div>
            <div className="relative w-full md:w-1/3 px-4 pb-9 md:pb-0 mb-12 lg:mb-0">
              <div className="hidden md:block absolute top-1/2 right-0 w-px h-28 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="md:hidden absolute bottom-0 left-1/2 h-px w-40 bg-gray-200 transform -translate-x-1/2"></div>
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-[#002d41] mb-5">
                  {formatCount(webTemplatesCount, 100)}
                </span>
                <span className="text-xl text-[#002d41]">Startups</span>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-center">
                <span className="block text-5xl lg:text-7xl font-bold text-[#002d41] mb-5">
                  {formatCount(mobileTemplatesCount, 1000)}
                </span>
                <span className="text-xl text-[#002d41]">Pitch Decks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
