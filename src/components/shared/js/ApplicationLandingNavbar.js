import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ParatiLogo from "../../Asset/parati-logo.png";
import "../css/ApplicationLandingNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import ParatiLogoMobile from "../../Asset/logo512.png";

function Navbar({ historyShow, historyHide }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleHistoryButtonClicked = () => {
    navigate("/pages/presentationhistory");
  };

  const handleLogoClicked = () => {
    window.open("/", "_blank");
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="appLanding-nav">
      <div className="appLanding-navbar-container">
        <div className="appLanding-navbar-logo-container">
          <img src={ParatiLogo} alt="Parati logo" className="desktop-logo" onClick={handleLogoClicked} />
          <img src={ParatiLogoMobile} alt="Mobile logo" className="mobile-logo" />
        </div>

        <div className="appLanding-navbar-details-container">
          <button
            className="appLanding-history-button"
            onMouseEnter={historyShow}
            onMouseLeave={historyHide}
            onClick={handleHistoryButtonClicked}
          >
            <FontAwesomeIcon className="history-icon" icon={faHistory} />{" "}
            <span> History</span>
          </button>
          <div className="appLanding-user-container" ref={dropdownRef} onClick={handleProfileClick}>
            <img
              src={localStorage.getItem("userDP")}
              className="appLanding-user"
              alt="User Profile"
            />
            <div className={`dropdown-menu ${dropdownVisible ? "show" : ""}`}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
