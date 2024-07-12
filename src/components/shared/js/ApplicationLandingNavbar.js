import React, { useState, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import ParatiLogo from "../../Asset/parati-logo.png";
import "../css/ApplicationLandingNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ParatiLogoMobile from "../../Asset/logo512.png";

function Navbar({ historyShow, historyHide }) {
  const navigate = useNavigate();
  const handleHistoryButtonClicked = () => {
    navigate("/pages/presentationhistory");
  };
  const handleLogoClicked = () => {
    window.open("/", "_blank");
  };
  return (
    <nav className="appLanding-nav">
      <div className="appLanding-navbar-container">
        <div className="appLanding-navbar-logo-container">
          <img src={ParatiLogo} alt="Parati logo" className="desktop-logo" onClick={handleLogoClicked} />
          <img src={ParatiLogoMobile} alt="Mobile logo" className="mobile-logo" />
        </div>

        <div className="appLanding-navbar-details-container">
          {/* Apply hover event handlers */}
          <button
            className="appLanding-history-button"
            onMouseEnter={historyShow}
            onMouseLeave={historyHide}
            onClick={handleHistoryButtonClicked}
          >
            <FontAwesomeIcon className="history-icon" icon={faHistory} />{" "}
            <span> History</span>
          </button>
          <img
            src={localStorage.getItem("userDP")}
            className="appLanding-user"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
