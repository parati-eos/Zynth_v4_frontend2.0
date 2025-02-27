import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';
import Home from './components/pages/js/home';
import Login from './components/auth/login';
import ApplicationLanding from './components/pages/js/applicationLanding';
import FormPage from './components/pages/js/form';
import PresentationCheck from './components/pages/js/presentationcheck';
import ReviewResponses from './components/pages/js/ReviewResponses';
import History from './components/pages/js/presentationhistory';
import About from './components/pages/home/about.js';
import Contact from './components/pages/home/Contact.js';
import PresentationShare from './components/pages/js/presentationshare.js';
import Presentationedit from './components/pages/js/Presentationedit';
import PaymentSuccess from './components/pages/Payment/Payment_success.js';
import ConciseForm from './components/pages/conciseForm/form';
import SectionForm from './components/pages/sectionForm/sectionForm';
import PaymentFailed from './components/pages/Payment/payment_failed.js';
import Dashboard from './components/pages/js/dashboard.js';
function App() {
  useEffect(() => {
    ReactGA.initialize('G-7EK1LG8K6D'); // Initialize Google Analytics
    ReactGA.pageview(window.location.pathname + window.location.search); // Record initial pageview
   // Store UTM link in local storage
   const currentUrl = window.location.href;
   const normalizedUrl = currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl;
 
   // Check if 'sign_up_link' is already in localStorage
   const storedUrl = localStorage.getItem('sign_up_link');
 
   // Store the full URL in localStorage if it's not already set
   if (!storedUrl) {
     localStorage.setItem('sign_up_link', normalizedUrl);
     console.log('Initial URL stored:', normalizedUrl);
   } else {
     console.log('URL already stored:', storedUrl);
   }

   //////////////////////////////////////////////////////////////////////////////////////////
      // Check if the environment is zynth.ai
      // const isZynthAI = window.location.hostname === 'zynth.ai';

      // if (isZynthAI) {
      //     const handleContextMenu = (event) => {
      //         event.preventDefault();
      //     };

      //     const handleKeyDown = (event) => {
      //         if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
      //             event.preventDefault();
      //         }
      //     };

      //     document.addEventListener('contextmenu', handleContextMenu);
      //     document.addEventListener('keydown', handleKeyDown);

      //     return () => {
      //         document.removeEventListener('contextmenu', handleContextMenu);
      //         document.removeEventListener('keydown', handleKeyDown);
      //     };
      // }


      const isZynthAI = window.location.hostname === 'pitch.zynth.ai';

      if (isZynthAI) {
        const handleContextMenu = (event) => {
          event.preventDefault();
        };
  
        const handleKeyDown = (event) => {
          // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, and Ctrl+U
          if (
            event.key === 'F12' || 
            (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) ||
            (event.ctrlKey && event.key === 'U')
          ) {
            event.preventDefault();
          }
        };
  
        // Attach event listeners
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
  
        // Clean up listeners on unmount
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
      ///////////////////////To block the dev tool globally/////////////////////////////////
       // Google Ads tracking
      //  const gtagScript = document.createElement('script');
      //  gtagScript.async = true;
      //  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-667504395";
      //  document.head.appendChild(gtagScript);
     
      //  window.dataLayer = window.dataLayer || [];
      //  window.gtag = function() { dataLayer.push(arguments); };
      //  window.gtag('js', new Date());
      //  window.gtag('config', 'AW-667504395');
    const INACTIVITY_THRESHOLD = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    // Store the current timestamp of user activity
    const storeActivityTimestamp = () => {
      sessionStorage.setItem('lastActivity', Date.now().toString());
    };

    // Check if 2 hours of inactivity have passed
    const checkInactivity = () => {
      const lastActivity = sessionStorage.getItem('lastActivity');
      if (lastActivity && Date.now() - parseInt(lastActivity, 10) > INACTIVITY_THRESHOLD) {
        // 2 hours of inactivity detected, redirect to login page
        window.location.href = '/auth/login';  // Use window.location for redirect
      }
    };

    // Add event listeners for user activity
    const activityEvents = ['click', 'mousemove', 'keypress', 'scroll'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, storeActivityTimestamp);
    });

    // Set the initial timestamp when the app loads
    storeActivityTimestamp();

    // Check inactivity every minute (or adjust interval as needed)
    const inactivityInterval = setInterval(checkInactivity, 60 * 1000);

    // Cleanup event listeners and intervals on component unmount
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, storeActivityTimestamp);
      });
      clearInterval(inactivityInterval);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/share" element={<PresentationShare />} />
        <Route path='/presentationedit' element={<Presentationedit/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailed />} />
        <Route path="/" element={<Home />} />
        <Route path="/sectionForm" element={<SectionForm Title='Financials'/>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/applicationLanding" element={<ApplicationLanding />} />
        <Route path="/Pages/presentationcheck" element={<PresentationCheck />} />
        <Route path="/Pages/ReviewResponses" element={<ReviewResponses />} />
        <Route path="/pages/presentationhistory" element={<History />} />
        <Route path="/pages/shortform" element={<ConciseForm/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/Blog" element={<Blog />} /> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;