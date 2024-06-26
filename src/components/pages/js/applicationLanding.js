// ApplicationLanding.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApplicationLandingNavbar from "../../shared/js/ApplicationLandingNavbar.js";
import img1 from "../../Asset/1.png";
import img2 from "../../Asset/2.png";
import img3 from "../../Asset/3.png";
import img4 from "../../Asset/4.png";
import presentationImg from "../../Asset/background.jpg";
import magicWand from "../../Asset/magic-wand.png";
import "../css/applicationLanding.css";
import "../css/HistoryOverlay.css";
import HistoryCardPreview from "../cards/historycardpreview.js";

function ApplicationLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user; // Retrieve user details from props
  const [showHistory, setShowHistory] = useState(false);
  const historyTimeout = useRef(null); // Ref for the timeout

  const handleCheckHistory = () => {
    console.log("Checking History...");
    // Add your logic to fetch and display history here
  };

  const handleBuildPresentation = () => {
    console.log("working");
    // Redirect to the 'form.js' page upon clicking "Build Presentation"
    navigate("/Pages/Nativeform", { state: { user } });
  };

  const handleGeneratePPTWithZynth = () => {
    console.log("Generate PPT with Zynth");
    // Implement logic for generating PPT with Zynth
    navigate("/pages/shortform", { state: { user } });
  };

  const handleLogout = () => {
    // Clear the user's session and redirect to the login page
    // You can implement your logout logic here
    // For example, clearing tokens, cookies, or any other user data
    navigate("/auth/login");
  };

  // History-Preview Code
  const [userID, setUserID] = useState(localStorage.getItem("userEmail"));

  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const response = await fetch(
          "https://zynth.ai/api/history",
          {
            headers: {
              "x-userid": userID,
            },
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataHistory();
  }, [userID]);

  const [historyData, setHistoryData] = useState([]);
  const handleMouseEnterHistory = () => {
    clearTimeout(historyTimeout.current); // Clear any existing timeout
    setShowHistory(true);
  };

  const handleMouseLeaveHistory = () => {
    // Set a timeout to hide the history div after a delay
    historyTimeout.current = setTimeout(() => {
      setShowHistory(false);
    }, 200); // Adjust the delay as needed
  };

  const handleMouseEnterDiv = () => {
    clearTimeout(historyTimeout.current); // Clear any existing timeout
    console.log("Enter the div");
  };

  const handleMouseLeaveDiv = () => {
    setShowHistory(false);
    console.log("Left the div");
  };

  const handleShowMoreHistory = () => {
    navigate("/pages/presentationhistory");
  };

  return (
    <div className="main-container">
      <div className="appnavbar">
        <ApplicationLandingNavbar
          user={user}
          historyShow={handleMouseEnterHistory}
          historyHide={handleMouseLeaveHistory}
        />
      </div>
      {showHistory && (
        <div className="history-preview-overlay">
          <div
            className="history-preview-bar"
            onMouseEnter={handleMouseEnterDiv}
            onMouseLeave={handleMouseLeaveDiv} // Close history on mouse leave
          >
            <div className="history-preview-cards-row">
              {historyData.slice(0, 5).map((card, index) => (
                <HistoryCardPreview key={index} {...card} />
              ))}
            </div>
            <div className="see-more-container" onClick={handleShowMoreHistory}>
              See More ...
            </div>
          </div>
        </div>
      )}
      <div className="app-landing-container">
        <div className="image-stack" onMouseEnter={handleMouseLeaveDiv}>
          <div className="button-shade">
            <div className="button-shade1">
              <div className="button-shade2">
                <div className="button-shade3">
                  <div className="button-container">
                    <button
                      className="overlay-button"
                      onClick={handleGeneratePPTWithZynth}
                    >
                      <div>
                        <img src={magicWand} alt="Magic Wand" />
                      </div>
                      <div>Generate Concise Deck</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
{/* 2nd */}
          <div className="button-shade">
            <div className="button-shade1">
              <div className="button-shade2">
                <div className="button-shade3">
                  <div className="button-container1">
                    <button
                      className="overlay-button1"
                      onClick={handleBuildPresentation}
                      style={{ marginTop: "1rem" }} // Added margin-top to create space between buttons
                    >
                      <div>
                        <img src={magicWand} alt="Magic Wand" />
                      </div>
                      <div>Generate Extended Deck</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationLanding;
