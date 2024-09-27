import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import Home from './components/pages/js/home';
import Login from './components/auth/login';
import ApplicationLanding from './components/pages/js/applicationLanding';
import FormPage from './components/pages/js/form';
import PresentationCheck from './components/pages/js/presentationcheck';
import ReviewResponses from './components/pages/js/ReviewResponses';
import History from './components/pages/js/presentationhistory';
import About from './components/pages/home/about';
import Contact from './components/pages/home/Contact';
import PresentationShare from './components/pages/js/presentationshare';
import Presentationedit from './components/pages/js/Presentationedit';
import ConciseForm from './components/pages/conciseForm/form';
import SectionForm from './components/pages/sectionForm/sectionForm';
import Dashboard from './components/pages/js/dashboard';

function App() {
  const navigate = useNavigate();
  const [inactivityTimer, setInactivityTimer] = useState(null);

  useEffect(() => {
    ReactGA.initialize('G-7EK1LG8K6D');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      const newTimer = setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/auth/login');
      }, 10800000); // 3 hours in milliseconds

      setInactivityTimer(newTimer);
    };
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    handleActivity();
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [inactivityTimer, navigate]);

  return (
    <Routes>
      <Route path="/zynth/dashboard" element={<Dashboard />} />
      <Route path="/share" element={<PresentationShare />} />
      <Route path="/presentationedit" element={<Presentationedit />} />
      <Route path="/" element={<Home />} />
      <Route path="/sectionForm" element={<SectionForm Title="Financials" />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/applicationLanding" element={<ApplicationLanding />} />
      <Route path="/Pages/presentationcheck" element={<PresentationCheck />} />
      <Route path="/Pages/ReviewResponses" element={<ReviewResponses />} />
      <Route path="/pages/presentationhistory" element={<History />} />
      <Route path="/pages/shortform" element={<ConciseForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
