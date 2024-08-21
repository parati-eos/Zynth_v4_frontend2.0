import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import ParatiLogo from "../../Asset/parati-logo.png";
import "../css/home_login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`home-nav ${isSticky ? 'fixed top-0 w-full z-10 bg-white shadow-lg' : ''}`}>
      <div className="home-navbar-container">
        <div className="home-icon">
          <Link to="/" className="home-icon-img">
            <img src={ParatiLogo} alt="Parati Logo" className="home-navbar-logo" />
          </Link>
        </div>
        <div className="home-navbar-buttons">
          <div className="dropdown-mobile">
            <button className="home-navbar-section-button dropdown-btn">
              <FontAwesomeIcon className="hamburger-icon" icon={faBars} />
            </button>
            <div className="dropdown-content">
              <Link to="features" smooth={true} offset={-70} className="dropdown-link">
                Features
              </Link>
              <Link to="samples" smooth={true} offset={-70} className="dropdown-link">
                Samples
              </Link>
              <Link to="blogs" smooth={true} offset={-70} className="dropdown-link">
                Blogs
              </Link>
              <a href="/auth/login" className="home-navbar-button-mobile">Sign In</a>
            </div>
          </div>
          <a href="/auth/login" className="home-navbar-button2">Sign In</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;