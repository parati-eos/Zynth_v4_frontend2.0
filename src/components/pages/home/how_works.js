import React from "react";
const ZigzagLayout = () => {
  return (
    <>
      <div className="" data-aos="fade-up" data-aos-duration="1000">
        <h1 className=" text-[#EAB308] mt-8 md:mt-16 lg:text-3xl text-2xl mx-auto font-bold max-lg:px-8 px-12 text-center ">
          How&nbsp;<span className="textbrown">Zynth Works</span>
        </h1>
        <br></br>
        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div className="w-full max-w-2xl">
            <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
              <span className="font-bold text-[#EAB308] mb-2">
                <strong>Step 1 - Start</strong>
              </span>
              <br></br>
              <span className="text-white">
                <strong>
                  Fill Out a Short Questionnaire
                  <br></br>About Your Business
                </strong>
              </span>
            </div>
            <br></br>
            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
              Provide essential details about your company, products, and
              services. The more context you provide, the better the pitch deck.
            </p>
            <br></br>
            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button className="bg-[#EAB308] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors" onClick={() => window.location.href = '/auth/login'}>
              Start Creating
              </button>
            </div>
          </div>

          <div
            className="max-lg:mt-4 flex justify-center items-start"
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

   <div className="" data-aos="fade-up" data-aos-duration="1000">
  <h1 className="text-[#EAB308] mt-18 md:mt-20 lg:text-2xl text-1xl text-right mr-4 md:mr-32 font-bold max-lg:px-8 px-12">
    {/* <strong>
      Step 2&nbsp;<span className="textbrown">- Sit Back</span>
    </strong> */}
  </h1>

  <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
    {/* Content Section */}
    <div className="lg:text-base text-sm mt-4 md:mt-8 mx-4 md:mx-8 mr-8 md:mr-4 w-full max-w-xl text-white text-left">
    <span className="ml-8 lg:text-2xl custom-text">
  <strong >
    <span className="text-[#EAB308]">Step 2 - Sit Back</span>
  </strong>
  <br /><br />
  <strong className="move-left">
    &nbsp;&nbsp;&nbsp;&nbsp; Let AI Work Its Magic to Create
    <br /> &nbsp;&nbsp;&nbsp; Your Custom Pitch Deck
  </strong>
</span>
      <br /><br />
      <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white move-left-p">
        Zynth uses AI to generate presentations by analyzing your website
        and online content, crafting slide decks that are perfectly
        aligned with your brand.
      </p>
      <br />
      
<style jsx>{`
  @media (max-width: 768px) {
    .custom-text {
      font-size: 1.2rem; /* Increase font size for mobile view */
    }

    /* Ensure that only specific spans within custom-text are affected */
    .custom-text > strong > span {
      font-size: inherit;
    }
          /* Move the strong text slightly to the left on mobile view */
    .custom-text .move-left {
      margin-left: -26px; /* Adjust this value as needed */
      display: block;
    }
         /* Move the p tag slightly to the left on mobile view */
    .move-left-p {
      margin-left: -6px; /* Adjust this value as needed */
    }
    .custom-text > strong {
      padding-top: 10px; /* Adjust this value as needed */
      display: block; /* Ensure block display for padding effect */
    }

    .custom-text strong {
      font-size: inherit;
    }
  }
`}</style>

      <div className="flex justify-start mt-6 mx-4 md:mx-8">
        <button className="bg-[#EAB308] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors" onClick={() => window.location.href = '/auth/login'}>
          See Magic
        </button>
      </div>
    </div>

    {/* Image Section */}
    <div className="mt-4 mx-0 flex justify-start items-start md:ml-8 md:order-first">
      <img
        src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_02.gif"
        className="mb-10 mx-0 ml-0 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
        alt="Workspace"
      />
    </div>
  </div>

  {/* Additional styling for mobile */}
  <style jsx>{`
    @media (max-width: 768px) {
      .md\\:order-first {
        order: 2;
      }
      .flex-col {
        flex-direction: column;
      }
    }
  `}</style>
</div>

      <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12 mt-16 mb-16">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col lg:text-2xl text-lg mt-4 md:mt-8 mx-4 md:mx-8">
            <span className="font-bold text-[#EAB308] mb-2">
              <strong>Step 3 - Refine</strong>
            </span>
            <br></br>
            <span className="text-white">
              <strong>
                Seamlessly Add New Slides
                <br></br> or Refine Existing Ones
              </strong>
            </span>
          </div>
          <br></br>
          <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white">
            Zynth lets you easily add new slides or refine existing ones with
            text-based inputs, all while maintaining a professional design.
          </p>
          <br></br>
          <div className="flex justify-start mt-6 mx-4 md:mx-8">
            <button className="bg-[#EAB308] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors" onClick={() => window.location.href = '/auth/login'}>
            Start Creating
            </button>
          </div>
        </div>

        <div
          className="max-lg:mt-4 flex justify-center items-start"
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
      <div className="" data-aos="fade-up" data-aos-duration="1000">
        <h1 className="text-[#EAB308] mt-18 md:mt-20 lg:text-2xl text-1xl text-right mr-4 md:mr-32 font-bold max-lg:px-8 px-12">
          {/* <strong>
            Step 2&nbsp;<span className="textbrown">- Sit Back</span>
          </strong> */}
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-start max-lg:px-8 px-12">
          <div className="max-lg:mt-4 mx-0 flex justify-start items-start md:order-first">
            <img
              src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo_GIF_04.gif"
              className="mb-10 mx-0 ml-0 md:ml-8 w-full md:w-98 lg:w-148 h-84 rounded-xl shadow-md shadow-gray-300"
              alt="Workspace"
            />
          </div>
            {/* Additional styling for mobile */}
  <style jsx>{`
    @media (max-width: 768px) {
      .md\\:order-first {
        order: 2;
      }
      .flex-col {
        flex-direction: column;
      }
    }
  `}</style>
          <p className="lg:text-base text-sm mt-4 md:mt-8 mx-4 md:mx-8 mr-8 md:mr-4 w-full max-w-xl text-white text-left">
            <span className="ml-8 lg:text-2xl custom-text">
              <strong>
                <span className="text-[#EAB308]">Step 4 - Export</span>
              </strong>
              <br></br>
              <br></br>
              <strong className="move-left">
                &nbsp;&nbsp;&nbsp;&nbsp; Export to Google Slides 
                {" "}
                <br></br> &nbsp; &nbsp;&nbsp; for Final Edits
              </strong>
            </span>
            <br></br>
            <p className="lg:text-1xl text-lg mt-4 mx-4 md:mx-8 text-white move-left-p">
            Export your AI-generated presentation to Google Slides for any final tweaks,
             while ensuring everything stays with Zynth.

            </p>
            <style jsx>{`
  @media (max-width: 768px) {
    .custom-text {
      font-size: 1.2rem; /* Increase font size for mobile view */
    }

    /* Ensure that only specific spans within custom-text are affected */
    .custom-text > strong > span {
      font-size: inherit;
    }
          /* Move the strong text slightly to the left on mobile view */
    .custom-text .move-left {
      margin-left: -26px; /* Adjust this value as needed */
      display: block;
    }
         /* Move the p tag slightly to the left on mobile view */
    .move-left-p {
      margin-left: -6px; /* Adjust this value as needed */
    }
    .custom-text > strong {
      padding-top: 8px; /* Adjust this value as needed */
      display: block; /* Ensure block display for padding effect */
    }

    .custom-text strong {
      font-size: inherit;
    }
  }
`}</style>
            <br></br>
            <div className="flex justify-start mt-6 mx-4 md:mx-8">
              <button className="bg-[#EAB308] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors" onClick={() => window.location.href = '/auth/login'}>
              Start Sharing
              </button>
            </div>
          </p>
        </div>
      </div>

    </>
  );
};

export default ZigzagLayout;