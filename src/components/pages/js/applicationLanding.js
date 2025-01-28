// ApplicationLanding.js
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ApplicationLandingNavbar from '../../shared/js/ApplicationLandingNavbar.js'

import magicWand from '../../Asset/magic-wand.png'
import '../css/applicationLanding.css'
import '../css/HistoryOverlay.css'
import HistoryCardPreview from '../cards/historycardpreview.js'

function ApplicationLanding() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state && location.state.user // Retrieve user details from props
  const [showHistory, setShowHistory] = useState(false)
  const historyTimeout = useRef(null) // Ref for the timeout

  const handleGeneratePPTWithZynth = () => {
    // console.log("Generate PPT with Zynth");
    // Implement logic for generating PPT with Zynth
    navigate('/pages/shortform', { state: { user } })
  }

  // History-Preview Code
  const [userID, setUserID] = useState(localStorage.getItem('userEmail'))

  useEffect(() => {
    const fetchDataHistory = async () => {
      try {
        const serverurl = process.env.REACT_APP_SERVER_URL
        const response = await fetch(`${serverurl}/history`, {
          headers: {
            'x-userid': userID,
          },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setHistoryData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataHistory()
  }, [userID])

  const [historyData, setHistoryData] = useState([])

  const handleMouseEnterDiv = () => {
    clearTimeout(historyTimeout.current) // Clear any existing timeout
    // console.log("Enter the div");
  }

  const handleMouseLeaveDiv = () => {
    setShowHistory(false)
    // console.log("Left the div");
  }

  const handleShowMoreHistory = () => {
    navigate('/pages/presentationhistory')
  }

  return (
    <div className="main-container">
      <div className="appnavbar">
        <ApplicationLandingNavbar user={user} />
      </div>
      {showHistory && (
        <div className="history-preview-overlay">
          <div
            className="history-preview-bar"
            onMouseEnter={handleMouseEnterDiv}
            onMouseLeave={handleMouseLeaveDiv} // Close history on mouse leave
          >
            <div className="history-preview-cards-row">
              {historyData.slice(0, 5).map((card, index) => (
                <HistoryCardPreview key={index} {...card} />
              ))}
            </div>
            <div className="see-more-container" onClick={handleShowMoreHistory}>
              See More ...
            </div>
          </div>
        </div>
      )}
      <div className="app-landing-container">
        <div className="image-stack" onMouseEnter={handleMouseLeaveDiv}>
          <div className="button-shade">
            <div className="button-shade1">
              <div className="button-shade2">
                <div className="button-shade3">
                  <div className="button-container">
                    <button
                      className="overlay-button"
                      onClick={handleGeneratePPTWithZynth}
                    >
                      <div>
                        <img src={magicWand} alt="Magic Wand" />
                      </div>
                      <div>Generate Pitch Deck</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationLanding
