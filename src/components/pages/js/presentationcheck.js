   import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/presentationcheck.css";
import "../css/HistoryOverlay.css";
import ShareButton from "./Share.js";
import ExportButton from "./export.js";
import Googleslides from "../../helper/googlepresentation-helper.js";
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";

// import Footer from "../../shared/js/footer.js";

import HistoryCardPreview from "../cards/historycardpreview.js";
const GooglePresentation = ({ url }) => {
  return (
    <div className="PresentationContainer">
      <div>
        <Googleslides />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

const PresentationCheck = () => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false); // State for showing copy message
  const historyTimeout = useRef(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentSlideKey, setCurrentSlideKey] = useState(0);
  var formId = localStorage.getItem("submissionId");

  //History-Preview Code
  const [userID, setUserID] = useState(localStorage.getItem("userEmail"));

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRerender(prev => !prev);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);



  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const response = await fetch("https://zynth.ai/api/history", {
          headers: {
            "x-userid": userID,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log();
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

  const handleBuildPresentation = () => {
    setCurrentSlideKey((prevKey) => prevKey + 1);
    navigate("/form");
  };

  const handleShare = () => {
    const uniqueShareableUrl = `https://zynth.ai/share?submissionId=${formId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Share Presentation",
          text: "Check out this presentation",
          url: uniqueShareableUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed: ", error));
    } else if (navigator.clipboard && navigator.platform.includes("Mac")) {
      // For macOS devices where navigator.share is not available
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      // For other devices where neither navigator.share nor clipboard API is available
      alert("Sharing is not supported on this device/browser.");
    }
  };

  // Company Name--------------->>
  const [PPTName, setPPTName] = useState("PPTName");

  useEffect(() => {
    formId = localStorage.getItem("submissionId");
    console.log("foooooooooorm id: ", formId);
    const fetchData = async () => {
      const apiUrl = `https://zynth.ai/api/slides/url?formId=${formId}`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("===============================", data[3]);
        setPPTName(data[3]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (formId !== "") {
      fetchData();
    }
  }, [formId]);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setPPTName(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);

    const requestBody = {
      userID: localStorage.getItem("userEmail"),
      formID: localStorage.getItem("submissionId"),
      newColumnValue: PPTName,
    };

    try {
      const response = await fetch("https://zynth.ai/api/submission/update-row", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Row updated successfully");
        alert("Row updated successfully");
      } else {
        console.error("Failed to update row");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [error, setError] = useState(false);
  const handleError = (error) => {
    console.error("Error occurred:", error);
    setError(true);
  };
  // <<---------------Company Name
  const handleDownload = async () => {
    try {
      const formId = localStorage.getItem("submissionId");
      if (!formId) {
        throw new Error("Form ID not found in localStorage");
      }
  
      const response = await fetch(`https://zynth.ai/api/slides/url?formId=${formId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Result:", result);
  
      // Ensure the response is an array and contains at least 3 elements
      if (!Array.isArray(result) || result.length < 3) {
        throw new Error("Invalid response format");
      }
  
      // Extract the URL from the result
      const url = result[2];
      console.log("URL:", url);
  
      // Check if the URL is valid
      if (!url || typeof url !== "string") {
        throw new Error("Invalid URL in response");
      }
  
      // Open the URL in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error exporting presentation:", error);
      // Show a message or popup to inform the user
      alert("Oops! It seems like the pitch deck presentation is missing. Click 'Generate Presentation' to begin your journey to success!");
    }
  };
  
  
  
  return (
    <div className="main-container">
      <ApplicationNavbar
        userpicture="https://media.licdn.com/dms/image/D4E03AQF9OIoA21TMgw/profile-displayphoto-shrink_800_800/0/1678095291696?e=2147483647&v=beta&t=Qm1QQSeBYNehm5t63Q1EhRpZbrfpiR35HPzAC78lRRs"
        historyShow={handleMouseEnterHistory}
        historyHide={handleMouseLeaveHistory}
      />
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

      {/******************************************/}
      <div className="presentation-viewing-container">
        <div className="presentation-viewing-side">
          <div className="share-export">
            {isEditing ? (
              <input
                type="text"
                value={PPTName}
                onBlur={handleSave}
                onChange={handleNameChange}
              />
            ) : (
              <h2 onClick={() => setIsEditing(true)}>
                <span>{PPTName}</span>
              </h2>
            )}
            <div className="share-export-combine">
              <ShareButton onClick={handleShare} />
              <ExportButton onClick={handleDownload} />
            </div>
          </div>
        </div>

        <div className="presentation-viewing-center">
          
          <div className="presentation-view-slides">
            <GooglePresentation key={currentSlideKey} />
          </div>
        </div>

        <div className="presentation-viewing-side"></div>
      </div>
    </div>
  );
};

export default PresentationCheck;