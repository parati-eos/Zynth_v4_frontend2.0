import React from 'react'
const ZigzagLayout = () => {
  return (
    <>
      <h1 className="text-[#5480c1] mt-8 lg:mb-5 md:mt-16 lg:text-3xl text-2xl mx-auto font-bold max-lg:px-8 px-12 text-center">
        How&nbsp;<span className="textbrown">Zynth Works</span>
      </h1>

      <div data-aos="fade-up" data-aos-duration="1000">
        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div className="w-full max-w-2xl order-2 md:order-1 p-8">
            <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
              <span className="font-bold text-[#5480c1] mb-7">
                <strong>Step 1 - Start</strong>
              </span>

              <span className="text-white mb-5">
                <strong>
                  Fill Out a Short Questionnaire About Your Business
                </strong>
              </span>
            </div>

            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
              Provide essential details about your company, products, and
              services. The more context you provide, the better the pitch deck.
            </p>

            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button
                className="bg-[#5480c1] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-[#17191A] transition-colors"
                onClick={() => (window.location.href = '/auth/login')}
              >
                Start Creating
              </button>
            </div>
          </div>

          <div
            className="max-lg:mt-4 flex justify-center items-start order-1 md:order-2 p-8"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <img
              src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_01.gif"
              className="mb-10 mx-4 md:mx-24 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
              alt="Workspace"
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div
            className="max-lg:mt-4 flex justify-center items-start order-1 md:order-1 p-8"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <img
              src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_02.gif"
              className="mb-10 mx-4 md:mx-24 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
              alt="Workspace"
            />
          </div>

          <div className="w-full max-w-2xl order-2 md:order-2 p-8">
            <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
              <span className="font-bold text-[#5480c1] mb-7">
                <strong>Step 2 - Sit Back</strong>
              </span>

              <span className="text-white mb-5">
                <strong>
                  Let AI Work Its Magic to Create Your Custom Pitch Deck
                </strong>
              </span>
            </div>

            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
              Zynth uses AI to generate presentations by analyzing your website
              and online content, crafting slide decks that are perfectly
              aligned with your brand.
            </p>

            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button
                className="bg-[#5480c1] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-[#17191A] transition-colors"
                onClick={() => (window.location.href = '/auth/login')}
              >
                See Magic
              </button>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div className="w-full max-w-2xl order-2 md:order-1 p-8">
            <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
              <span className="font-bold text-[#5480c1] mb-7">
                <strong>Step 3 - Refine</strong>
              </span>

              <span className="text-white mb-5">
                <strong>
                  Seamlessly Add New Slides or Refine Existing Ones
                </strong>
              </span>
            </div>

            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
              Zynth lets you easily add new slides or refine existing ones with
              text-based inputs, all while maintaining a professional design.
            </p>

            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button
                className="bg-[#5480c1] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-[#17191A] transition-colors"
                onClick={() => (window.location.href = '/auth/login')}
              >
                Start Creating
              </button>
            </div>
          </div>

          <div
            className="max-lg:mt-4 flex justify-center items-start order-1 md:order-2 p-8"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <img
              src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_03.gif"
              className="mb-10 mx-4 md:mx-24 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
              alt="Workspace"
            />
          </div>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div
            className="max-lg:mt-4 flex justify-center items-start order-1 md:order-1 p-8"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <img
              src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_04.gif"
              className="mb-10 mx-4 md:mx-24 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
              alt="Workspace"
            />
          </div>

          <div className="w-full max-w-2xl order-2 md:order-2 p-8">
            <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
              <span className="font-bold text-[#5480c1] mb-7">
                <strong>Step 4 - Export</strong>
              </span>

              <span className="text-white mb-5">
                <strong>Export to Google Slides for Final Edits</strong>
              </span>
            </div>

            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
              Export your AI-generated presentation to Google Slides for any
              final tweaks, while ensuring everything stays with Zynth.
            </p>

            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button
                className="bg-[#5480c1] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-white hover:text-[#17191A] transition-colors"
                onClick={() => (window.location.href = '/auth/login')}
              >
                Start Sharing
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ZigzagLayout
