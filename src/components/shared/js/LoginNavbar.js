import React from 'react'
import ParatiLogo from '../../Asset/parati-logo.png'
import '../css/LoginNavbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar({ handleClick }) {
  return (
    <nav className="login-nav">
      <div className="login-navbar-container">
        <img
          src="https://zynthimage.s3.amazonaws.com/uploads/1738213693038_parati-logo.png"
          className="login-navbar-logo"
          onClick={handleClick}
        ></img>
      </div>
    </nav>
  )
}

export default Navbar
