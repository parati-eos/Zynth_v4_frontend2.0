import React, { useState, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import ParatiLogo from "../../Asset/parati-logo.png";
import "../css/HistoryNavbar.css";
import ParatiLogoMobile from "../../Asset/logo512.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import magicWand from "../../Asset/magic-wand.png";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const useremail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const handleBuildPresentation = () => {
    // Redirect to the 'form.js' page upon clicking "Build Presentation"
    navigate("/pages/shortForm", { state: { useremail } });
  };
  const handleLogoClicked = () => {
    window.open("/", "_blank");
  };
  return (
    <nav className="history-nav">
      <div className="history-navbar-container">
        <div className="history-navbar-logo-container">
        <img src={ParatiLogo} alt="Parati logo" className="desktop-logo" onClick={handleLogoClicked} />
          <img src={ParatiLogoMobile} alt="Mobile logo" className="mobile-logo" onClick={handleLogoClicked}/>
        </div>
        <div className="history-navbar-generateppt-container">
          <button onClick={handleBuildPresentation}>
            <div className="history-button-inner">
              <img src={magicWand}></img>
              <span>Generate Pitch Deck</span>
            </div>
          </button>
        </div>
        <div className="history-navbar-details-container">
          {/* Apply hover event handlers */}
          <img src={localStorage.getItem("userDP")} className="history-user" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
