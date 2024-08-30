import React, { useState, useEffect } from "react";
import Joyride,{STATUS} from "react-joyride";
import './guide.css';

const GuidedTour = () => {
  const [run, setRun] = useState(false);

  const steps = [
      {
        target: "#add-section",
        content: "1/5 - Generate slides for new sections.",
        placement: "bottom",
      },
      {
        target: "#addicon",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 1 of 5</strong> <br />
            Generate slides for new sections.
          </div>
        ),
        placement: "bottom",
      },
      {
        target: "#editicon",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 2 of 5</strong> <br />
            Provide more inputs to refine and regenerate slides
          </div>
        ),
        placement: "bottom",
      },
      {
        target: "#share-button",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 3 of 5</strong> <br />
            Share the presentation as a weblink.
          </div>
        ),
        placement: "bottom",
      },
      {
        target: "#export-button",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 4 of 5</strong> <br />
            Export the presentation to Google Slides to make further edits.
          </div>
        ),
        placement: "bottom",
      },
      {
        target: "#history",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 5 of 5</strong> <br />
            Access history to view or edit past presentations.
          </div>
        ),
        placement: "bottom",
        isLast: true, // Mark this step as the last one
      },
  
      // Add more steps as needed
  ];

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Delay the start of the tour to ensure all elements are fully rendered
      const timer = setTimeout(() => {
        if (document.querySelector("#editicon")) {
          setRun(true);
          localStorage.setItem("hasVisited", "true");
        } else {
          // Retry after another short delay if elements aren't ready
          const retryTimer = setTimeout(() => {
            setRun(true);
            localStorage.setItem("hasVisited", "true");
          }, 1000); // Adjust delay if necessary

          return () => clearTimeout(retryTimer);
        }
      }, 1000); // Initial delay before starting the tour

      return () => clearTimeout(timer);
    }

    const applyCustomStyles = (skipButton) => {
      if (skipButton) {
        skipButton.style.fontSize = "20px";
        skipButton.style.color = "white"; // Customize the color here
      }
    };

    const observer = new MutationObserver(() => {
      const skipButton = document.querySelector('button[data-action="skip"]');
      applyCustomStyles(skipButton);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    
    <Joyride
      steps={steps}
      continuous
      scrollToFirstStep
      showSkipButton
      autoStart
      run={run} // Start the tour
      showBeacon={false} // Disable the beacon
      keyboardNavigation={true} // Enable keyboard navigation
      styles={{
        options: {
          arrowColor: '#E6A500',
          backgroundColor: '#E6A500',
          overlayColor: 'rgba(79, 26, 0, 0.4)',
          primaryColor: '#002B41',
          textColor: '#fff',
          width: 300,
          zIndex: 1000,
        },
        skipButton: {
          fontSize: '20px',
          color: 'inherit',
        },
      }}
      locale={{
        last: "Finish",
      }}
    />
  );
};

export default GuidedTour;
// import React, { useState } from "react";
// import Joyride from "react-joyride";

// const GuidedTour = () => {
//   const [run, setRun] = useState(false);

//   const steps = [
//     {
//       target: "#add-section",
//       content: "1/5 - Generate slides for new sections.",
//       placement: "bottom",
//     },
//     {
//       target: "#share-button",
//       content: "3/5 - Share the presentation as a weblink.",
//       placement: "bottom",
//     },
//     {
//       target: "#export-button",
//       content: "4/5 - Export the presentation to Google Slides to make further edits.",
//       placement: "bottom",
//     },
//     // Add more steps as needed
//   ];

//   const startTour = () => {
//     setRun(true);
//   };

//   return (
//     <>
//       <button onClick={startTour}>Start Guided Tour</button>
//       <Joyride
//       steps={steps}
//       continuous
//       scrollToFirstStep
//       showSkipButton
//       autoStart
//       run={run} // Start the tour
//       showBeacon={false} // Disable the beacon
//       keyboardNavigation={true} // Enable keyboard navigation
//       styles={{
//         options: {
//           arrowColor: '#E6A500',
//           backgroundColor: '#E6A500',
//           overlayColor: 'rgba(79, 26, 0, 0.4)',
//           primaryColor: '#002B41',
//           textColor: '#fff',
//           width: 300,
//           zIndex: 1000,
//         },
//         skipButton: {
//           fontSize: '20px',
//           color: 'inherit',
//         },
//       }}
//       locale={{
//         last: "Finish",
//       }}
//     />
//     </>
//   );
// };

// export default GuidedTour;
