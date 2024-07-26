import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../css/presentationshare.css";
import "../css/HistoryOverlay.css";
import GoogleslidesShare from "../../helper/googlepresentationShare-helper.js";

import ParatiLogo from "../../Asset/parati-logo.png";

const GooglePresentation = ({ url }) => {
  return (
    <div className="PresentationContainer">
      <div>
        <GoogleslidesShare />
      </div>
    </div>
  );
};

const PresentationCheck = () => {
  const historyTimeout = useRef(null);
  const [currentSlideKey, setCurrentSlideKey] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const formId = searchParams.get("submissionId");
  const navigate = useNavigate();
  // Company Name--------------->>

  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, [formId]);

  const handleLogoClicked = () => {
    navigate("/applicationLanding");
  };

  return (
    <div className="main-container">
      <div className="presentationshare-viewing-container">
        <div className="presentationshare-viewing-side">
          <div className="logo-icon">
            <img
              src={ParatiLogo}
              alt="Parati Logo"
              width={150}
              className="branding-logo"
              onClick={handleLogoClicked}
            ></img>
          </div>
        </div>
        <div className="presentationshare-viewing-center">
          <div className="presentationshare-view-slides">
            <GooglePresentation key={currentSlideKey} />
          </div>
        </div>
        <div className="presentationshare-viewing-side"></div>
      </div>
    </div>
  );
};

export default PresentationCheck;
