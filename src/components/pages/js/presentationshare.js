import React, { useState, useEffect, useRef } from 'react'
import { Grid } from 'react-loader-spinner'
import ShareSidebar from './ShareSidebar.js'
import ShareOutlineModal from './ShareOutlineModal.js'
import ParatiLogo from '../../Asset/parati-logo.png'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import '../css/presentationshare.css'

const PresentationShare = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const formId = searchParams.get('submissionId')
  const [slidesData, setSlidesData] = useState([])
  const [presentationID, setPresentationID] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentOutline, setCurrentOutline] = useState('')
  const desktopSlideRefs = useRef([])
  const desktopScrollContainerRef = useRef(null)
  const mobileSlideRefs = useRef([])
  const mobileScrollContainerRef = useRef(null)

  // MEDIUM LARGE SCREENS: Sidebar Outline Select
  const handleOutlineSelect = (title, isMobile) => {
    const slideRefs = isMobile ? mobileSlideRefs : desktopSlideRefs
    const slideIndex = slidesData.findIndex((o) => o[2] === title)
    if (slideIndex !== -1) {
      slideRefs.current[slideIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
      setCurrentOutline(title)
    }
  }

  // Handle scroll events to update the sidebar selection
  const handleScroll = (isMobile) => {
    const scrollContainerRef = isMobile
      ? mobileScrollContainerRef
      : desktopScrollContainerRef
    if (!scrollContainerRef.current) return
    const scrollTop = scrollContainerRef.current.scrollTop || 0
    let closestIndex = -1
    let minDistance = Number.MAX_VALUE

    const slideRefs = isMobile ? mobileSlideRefs : desktopSlideRefs
    slideRefs.current.forEach((slideRef, index) => {
      if (!slideRef) return
      const distance = Math.abs(slideRef.offsetTop - scrollTop)
      if (distance < minDistance) {
        closestIndex = index
        minDistance = distance
      }
    })

    if (closestIndex !== -1 && slidesData[closestIndex][2] !== currentOutline) {
      setCurrentOutline(slidesData[closestIndex][2])
    }
  }

  useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        const serverurl = process.env.REACT_APP_SERVER_URL
        const url = `${serverurl}/slides?formId=${formId}`
        const response = await axios.get(url)
        const data = response.data
        setPresentationID(data.id)
        setSlidesData(data.data)
        setCurrentOutline(data.data[0][2])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching slides data:', error.message)
      }
    }
    fetchSlidesData()
  }, [formId])

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-[13rem]">
        <Grid
          visible={true}
          height="120"
          width="120"
          color="#3667B2"
          ariaLabel="grid-loading"
          radius="12.5"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full share-no-no-scrollbar::-webkit-scrollbar ">
      <div className="flex flex-col items-center lg:items-start lg:px-6 justify-center bg-[#17191a]">
        <a
          href="https://zynth.ai/"
          target="_blank"
          className="transition-all duration-300 transform hover:scale-110 active:scale-95 active:opacity-80"
        >
          <img
            src="https://zynthimage.s3.amazonaws.com/uploads/1738213693038_parati-logo.png"
            alt="Parati Logo"
            className="h-10 w-28 mt-2"
          />
        </a>
      </div>
      <div className="bg-[#17191a] py-2 h-full w-full share-no-no-scrollbar::-webkit-scrollbar">
        {slidesData.length < 1 ? (
          <div className="text-center text-xl font-bold text-aliceblue">
            No slides to display. Please finalize some slides in the application
            to be displayed here.
          </div>
        ) : (
          <div>
            {/* DESKTOP */}
            <div className="desktop-view flex flex-row w-full h-full share-no-no-scrollbar::-webkit-scrollbar mt-2">
              <ShareSidebar
                onOutlineSelect={(title) => handleOutlineSelect(title, false)}
                selectedOutline={currentOutline}
                outlines={slidesData.map((slide) => slide[2] || 'Untitled')}
              />
              <div
                className="no-scrollbar rounded-lg shadow-lg relative w-[85%] ml-[1.85rem] lg:ml-2 lg:mr-4 bg-white border border-gray-200 overflow-y-scroll snap-y scroll-smooth snap-mandatory"
                style={{ height: 'calc(100vh - 100px)' }}
                onScroll={() => handleScroll(false)}
                ref={desktopScrollContainerRef}
              >
                {slidesData.map((outline, index) => (
                  <div
                    key={outline[2]}
                    ref={(el) => {
                      if (el) {
                        desktopSlideRefs.current[index] = el
                      }
                    }}
                    className="snap-start w-full h-full mb-4"
                  >
                    <iframe
                      className="w-full h-full bg-black border-[1px] border-[#3667B2] rounded-lg mb-2 pointer-events-none"
                      title={`Google slide - ${outline[2]}`}
                      src={`https://docs.google.com/presentation/d/${presentationID}/embed?rm=minimal&start=false&loop=false&slide=id.${outline[0]}`}
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
            {/* MOBILE*/}
            <div className="flex flex-col lg:hidden mt-[5rem]">
              <ShareOutlineModal
                onSelectOutline={(title) => handleOutlineSelect(title, true)}
                selectedOutline={currentOutline}
                outlines={slidesData.map((slide) => slide[2] || 'Untitled')}
              />
              <div
                onScroll={() => handleScroll(true)}
                ref={mobileScrollContainerRef}
                className=" mt-8 h-[50.5vh] rounded-lg shadow-lg relative w-full bg-white border border-gray-200 overflow-y-scroll snap-y scroll-smooth snap-mandatory"
              >
                {slidesData.map((outline, index) => (
                  <div
                    key={outline[2]}
                    className="snap-start w-full h-[50vh] lg:h-full mb-4"
                    ref={(el) => (mobileSlideRefs.current[index] = el)}
                  >
                    <iframe
                      className="w-full h-full bg-black border-[1px] border-[#3667B2] rounded-lg mb-2 pointer-events-none"
                      title={`Google slide - ${outline[2]}`}
                      src={`https://docs.google.com/presentation/d/${presentationID}/embed?rm=minimal&start=false&loop=false&slide=id.${outline[0]}`}
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PresentationShare
