import Joyride, { Step, Placement, STATUS } from "react-joyride";
import React, { useState, useEffect, useRef } from "react";

const GuidedTourOutlineMobile: React.FC = () => {
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
            target: "#outline-mobile",
            content: (
              <div style={{ textAlign: "center" }}>
                Add new sections to the outline to generate new slides.
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
    // Initialize steps and check screen size on mount
    initializeSteps();

    // Function to check if the screen is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 'lg' breakpoint in Tailwind is 1024px
    };

    handleResize(); // Initial check for screen size

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Runs only once on mount

  const handleCallback = (data: any) => {
    const { status, action } = data;

    if (status === STATUS.FINISHED) {
      localStorage.setItem("hasVisited", "true");
      setRun(false);
    } else if (status === STATUS.SKIPPED || action === "close") {
      localStorage.setItem("hasVisited", "true");
      setRun(false);
    }
  };

  return (
    <div>
      {/* Conditionally render Joyride only for mobile views */}
      {isMobile && (
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
              width: 250,
              zIndex: 1000,
            },
            buttonNext: {
              backgroundColor: "blue",
              color: "#fff",
            },
            buttonBack: {
              color: "white",
            },
            spotlight: {
              transform: "scale(0.8)",
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

export default GuidedTourOutlineMobile;
