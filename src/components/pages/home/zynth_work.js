import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
export default function ZynthWork() {
  const videoRef = useRef(null)
  const [isMuted, setIsMuteda] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // TODO: Remove comment to reset video to the start on scroll
            // videoRef.current.currentTime = 0
            // always autoplay in muted audio mode
            videoRef.current.muted = true
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [isMuted])

  const handleVolumeChange = () => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <div>
      <section className="relative py-5 md:py-5 lg:pb-10 overflow-hidden bg-stone-200">
        <img
          className="absolute top-0 right-0 md:mt-10 -mr-20 md:-mr-0"
          src="saturn-assets/images/stats/star-dark.svg"
          alt=""
        />
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl mt-20 text-center text-[#002d41]md:text-4xl font-bold text-yellow opacity-100">
              Jumpstart Your <span className="text-[#EAB308]">Pitch Deck</span>{' '}
              with Zynth
              <br />
              {/* <span style={{ color: "#e6a500" }}>
                Zynth generates presentation layouts that go beyond a simple paragraph of text and an image.
              </span> */}
            </h1>
            <p className="text-center mb-10 text-base md:text-xl mt-8 text-[18px]">
              Our platform creates customized pitch decks that go beyond simple
              slides with a block of text and an image.
              <br />
              Our proven frameworks ensure that your investor presentation is
              uniquely crafted for your startup.
            </p>

            {/* Video Section */}
            <div className="flex justify-center mt-8">
              <video
                className="rounded-lg shadow-lg"
                width="900" // Adjust width as needed
                controls
                ref={videoRef}
                onVolumeChange={handleVolumeChange}
              >
                <source
                  src="https://d2zu6flr7wd65l.cloudfront.net/uploads/Zynth_Demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
