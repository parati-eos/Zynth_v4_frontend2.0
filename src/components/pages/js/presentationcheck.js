// src/PresentationCheck.js
import React, { useState, useEffect, useRef } from 'react';
import '../css/presentationcheck.css';
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
const slides = [
  'Cover', 'About', 'Problem Areas', 'Solution', 'Market Sizing',
  'Product Overview', 'Product Roadmap', 'System Architecture',
  'Mobile App Screenshots', 'Web App Screenshots', 'Business Model',
  'Key Stakeholders', 'Customer Persona', 'Go-to-market Strategy',
  'Track Record', 'Case Study', 'Testimonials', 'Competitive Landscape',
  'Competitive Differentiation', 'Founding Team', 'Financial Overview', 'Contact Us'
];

const PresentationCheck = () => {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const slideRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slide = entry.target.getAttribute('data-slide');
          setSelectedSlide(slide);
        }
      });
    }, observerOptions);

    slideRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      slideRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSidebarClick = (slide, index) => {
    setSelectedSlide(slide);
    slideRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="presentation-check-container1">
      <ApplicationNavbar />
    <div className="presentation-check-container">
      <div className="sidebar">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`sidebar-item ${selectedSlide === slide ? 'active' : ''}`}
            onClick={() => handleSidebarClick(slide, index)}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="content">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="content-section"
            data-slide={slide}
            ref={el => slideRefs.current[index] = el}
          >
            <h2>{slide}</h2>
            <p>Content for {slide} will be shown here.</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PresentationCheck;
