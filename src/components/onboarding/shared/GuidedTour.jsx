
import Joyride, { Step, Placement, STATUS } from "react-joyride";

import React, { useState, useRef, useEffect } from "react";

const GuidedTour: React.FC = () => {
  const hasVisited = localStorage.getItem("hasVisited") === "true";
  const [run, setRun] = useState(!hasVisited); // Run the tour if user hasn't visited
  const [steps, setSteps] = useState<Step[]>([]);
  const [isMobile, setIsMobile] = useState(false); // State to track if the screen is mobile
  const isInitialized = useRef(false); // Track if initialization is done

  const initializeSteps = () => {
    if (isInitialized.current) return; // Prevent multiple initializations
    isInitialized.current = true;

    const initialSteps: Step[] = [
      {
        disableBeacon: true,
        target: "#outline",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 1 of 9</strong> <br />
            Add new sections to the outline to generate new slides.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
 
        target: "#new-version",
        content: (
          
          <div style={{ textAlign: "center" }}>
            <strong>Step 2 of 9</strong> <br />
            Navigate between different slide versions of the same section
          </div>
        ),
        styles: {
          beacon: {
            display: 'none',
          },
          
        },
    
        placement: "top" as Placement,
      },
      
     
      {
  
        target: "#arrows",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 3 of 9</strong> <br />
            Navigate between different slide versions of the same section
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#finalize",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 4 of 9</strong> <br />
            Finalize the selected slide version to add it to the final presentation. Only one slide version can be finalized within a section.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#delete",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 5 of 9</strong> <br />
            Delete the selected slide version from the presentation.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#share",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 6 of 9</strong> <br />
            Share the presentation as a weblink. Only finalized slide versions are added to the final presentation link.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#export",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 7 of 9</strong> <br />
            Export the presentation to Google Slides to make further edits. All slide versions are exported.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#history",
        styles: {
          beacon: {
            display: 'none',
          },
        },
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 8 of 9</strong> <br />
            Access history to view or edit past presentations.
          </div>
        ),
        placement: "top" as Placement,
      },
      {
        target: "#organization-profile",
        content: (
          <div style={{ textAlign: "center" }}>
            <strong>Step 9 of 9</strong> <br />
            Access organization profile, subscription plans, and other account details here
          </div>
        ),
        placement: "top" as Placement,
      },
    ];

    setSteps(
      initialSteps.filter(
        (step) =>
          typeof step.target === "string" && document.querySelector(step.target)
      )
    );
    
  };

  useEffect(() => {
    initializeSteps();
    // Detect mobile screen size
    setIsMobile(window.innerWidth < 1024); // 'lg' breakpoint in Tailwind is 1024px
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 1024);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 1024);
      });
    };
  }, []); // Only runs once on mount

  const handleCallback = (data: any) => {
    const { status, action } = data;

    if (status === STATUS.FINISHED) {
      localStorage.setItem("hasVisited", "true");
      setRun(false);
    } else if (status === STATUS.SKIPPED || action === "close") {
      localStorage.setItem("hasVisited", "true"); // Update localStorage
      setRun(false); // Stop the tour if skipped or closed
    }
  };

  return (
    <div>
      {/* Conditionally render Joyride only for non-mobile views */}
      {!isMobile && (
        <Joyride
          steps={steps}
          continuous={true}
          scrollToFirstStep={true}
          showSkipButton={true}
          run={run}
          callback={handleCallback}
          styles={{
            options: {
              arrowColor: "#3667B2",
              backgroundColor: "#3667B2",
              overlayColor: "rgba(79, 26, 0, 0.4)",
              primaryColor: "#496999",
              textColor: "#fff",
              width: 300,
              zIndex: 1000,
            },
            buttonNext: {
              backgroundColor: "blue", // Green Next button
              color: "#fff", // White text for Next button
            },
            buttonBack: {
              color: "white", // Blue text for Back button
            },
            spotlight: {
              transform: "scale(0.9)", // Shrink the spotlight size
            },
          }}
          locale={{
            last: "Finish",
            skip: "Skip",
          }}
        />
      )}
    </div>
  );
};

export default GuidedTour;
