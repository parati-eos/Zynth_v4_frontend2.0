// Home.js
import React from "react";
import Navbar from "..//../shared/js/Home_login";
import {Footer} from "../../shared/js/footer";
import { HeroParallaxDemo } from "../home/hero.tsx";
import { BackgroundBoxesDemo } from "../home/pitch.tsx";
import Blog from "../home/blog.tsx";
import { StickyScrollRevealDemo } from "../home/stickyScrollReveal.tsx";
import Stats from "../home/stats.tsx";
import { isIphone } from "../../../utils/deviceUtils.js";
import Features from "../home/zynth_work.js";
import Zigzag from "../home/how_works.js"
import Partner from "../home/partner.js"

function Home() {

  useEffect(() => {
    // Store the URL in localStorage if it contains 'zynth.ai'
    const currentUrl = window.location.href;
    if (currentUrl.includes('zynth.ai')) {
      localStorage.setItem('sign_up_link', currentUrl);
      console.log('Link containing zynth.ai stored:', currentUrl);
    }
  }, []);
  return (
    <div style={{ backgroundColor: "transparent", overflowX: 'hidden', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
     
        <HeroParallaxDemo />
        {/* Add other content for Samples section */}
   
       <div id="features">
      {/* <StickyScrollRevealDemo /> */}
      <Features />
      </div>
      <Zigzag/>
      <Stats />
      <Partner/>
      <div id="blogs"> {/* Ensure this div is still wrapping your Blog component */}
        <Blog />
      </div>
      {!isIphone() && <BackgroundBoxesDemo />} {/* Conditionally render based on device */}
      <Footer />
    </div>
  );
}

export default Home;
