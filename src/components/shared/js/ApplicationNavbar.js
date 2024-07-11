import React, { useState, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import ParatiLogo from "../../Asset/parati-logo.png";
import "../css/ApplicationNavbar.css";
import ParatiLogoMobile from "../../Asset/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import magicWand from "../../Asset/magic-wand.png";
import { faHistory, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar({ historyShow, historyHide }) {
  const useremail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const handleBuildPresentation = () => {
    // Redirect to the 'form.js' page upon clicking "Build Presentation"
    navigate("/applicationLanding", { state: { useremail } });
  };
  const handleHistoryButtonClicked = () => {
    navigate("/pages/presentationhistory");
  };
  const handleLogoClicked = () => {
    navigate("/applicationLanding");
  };
  return (
    <nav className="app-nav">
      <div className="app-navbar-container">
        <div className="app-navbar-logo-container">
          <img src={ParatiLogo} alt="Parati logo" className="desktop-logo"/>
          <img src={ParatiLogoMobile} alt="Mobile logo" className="mobile-logo"/>
        </div>
        <div className="app-navbar-generateppt-container">
          <button onClick={handleBuildPresentation}>
            <div className="app-button-inner">
              <img src={magicWand}></img>
              <span>Generate Pitch Deck</span>
            </div>
          </button>
        </div>
        <div className="app-navbar-details-container">
          {/* Apply hover event handlers */}
          <button
            className="app-history-button"
            onMouseEnter={historyShow}
            onMouseLeave={historyHide}
            onClick={handleHistoryButtonClicked}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span> History</span>
          </button>

          <img src={localStorage.getItem("userDP")} className="app-user" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
