import React, { useState, useLocation, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ParatiLogo from '../../Asset/parati-logo.png'
import '../css/HistoryNavbar.css'
import ParatiLogoMobile from '../../Asset/logo512.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import magicWand from '../../Asset/magic-wand.png'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const useremail = localStorage.getItem('userEmail')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const handleBuildPresentation = () => {
    // Redirect to the 'form.js' page upon clicking "Build Presentation"
    navigate('/pages/shortForm', { state: { useremail } })
  }
  const handleLogoClicked = () => {
    window.open('/', '_blank')
  }
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible)
    if (!dropdownVisible) {
      setTimeout(() => {
        setDropdownVisible(false)
      }, 3000)
    }
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
    <nav className="history-nav">
      <div className="history-navbar-container">
        <div className="history-navbar-logo-container">
          <img
            src="https://zynthimage.s3.amazonaws.com/uploads/1738213693038_parati-logo.png"
            alt="Parati logo"
            className="desktop-logo"
            onClick={handleLogoClicked}
          />
          <img
            src={ParatiLogoMobile}
            alt="Mobile logo"
            className="mobile-logo"
            onClick={handleLogoClicked}
          />
        </div>
        <div className="history-navbar-generateppt-container">
          <button onClick={handleBuildPresentation}>
            <div className="history-button-inner">
              <img src={magicWand}></img>
              <span>New Presentation</span>
            </div>
          </button>
        </div>
        <div className="history-navbar-details-container">
          {/* Apply hover event handlers */}
          <div
            className="history-userIcon-container"
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
              className="history-userIcon"
              alt="User Avatar"
            />
            <div
              className={`dropdown-menu-history ${
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
