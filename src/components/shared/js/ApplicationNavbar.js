import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ParatiLogo from '../../Asset/parati-logo.png'
import '../css/ApplicationNavbar.css'
import ParatiLogoMobile from '../../Asset/logo512.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import magicWand from '../../Asset/magic-wand.png'
import { faHistory } from '@fortawesome/free-solid-svg-icons'

function Navbar({ historyShow, historyHide }) {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const useremail = localStorage.getItem('userEmail')
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const handleBuildPresentation = () => {
    navigate('/applicationLanding', { state: { useremail } })
  }

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
    <nav className="bg-[#17191A] border-b border-[#17191A]">
      <div className="app-navbar-container">
        <div className="app-navbar-logo-container">
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
        <div className="app-navbar-generateppt-container">
          <button onClick={handleBuildPresentation}>
            <div className="app-button-inner">
              <img
                src={magicWand}
                alt="Magic Wand"
                className="text-[#5480c1] hover:text-[#5480c1]"
              />
              <span>New Presentation</span>
            </div>
          </button>
        </div>
        <div className="app-navbar-details-container">
          <button
            className="app-history-button"
            id="history"
            onMouseEnter={historyShow}
            onMouseLeave={historyHide}
            onClick={handleHistoryButtonClicked}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span> History</span>
          </button>
          <div
            className="application-userIcon-container"
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
              className="application-userIcon"
              alt="User Avatar"
            />
            <div
              className={`dropdown-menu-application ${
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
