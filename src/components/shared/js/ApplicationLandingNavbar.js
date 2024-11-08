import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ParatiLogo from '../../Asset/parati-logo.png'
import '../css/ApplicationLandingNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import ParatiLogoMobile from '../../Asset/logo512.png'

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const handleHistoryButtonClicked = () => {
    navigate('/pages/presentationhistory')
  }

  const handleLogoClicked = () => {
    window.open('/', '_blank')
  }

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible)
    if (!dropdownVisible) {
      setTimeout(() => {
        setDropdownVisible(false)
      }, 3000)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <nav className="appLanding-nav">
      <div className="appLanding-navbar-container">
        <div className="appLanding-navbar-logo-container">
          <img
            src={ParatiLogo}
            alt="Parati logo"
            className="desktop-logo"
            onClick={handleLogoClicked}
          />
          <img
            src={ParatiLogoMobile}
            alt="Mobile logo"
            className="mobile-logo"
          />
        </div>

        <div className="appLanding-navbar-details-container">
          <button
            className="appLanding-history-button"
            onClick={handleHistoryButtonClicked}
          >
            <FontAwesomeIcon className="history-icon" icon={faHistory} />{' '}
            <span> History</span>
          </button>
          <div
            className="appLanding-userIcon-container"
            ref={dropdownRef}
            onClick={handleProfileClick}
          >
            <img
              src={
                localStorage.getItem('userDP') &&
                localStorage.getItem('userDP') !== 'undefined'
                  ? localStorage.getItem('userDP')
                  : 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
              }
              className="appLanding-userIcon"
              alt="User Avatar"
            />
            <div
              className={`dropdown-menu-applicationLanding ${
                dropdownVisible ? 'show' : ''
              }`}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
