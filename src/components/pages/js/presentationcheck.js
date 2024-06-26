import React, { useState, useEffect, useRef } from 'react';
import '../css/presentationcheck.css';
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
import { log } from 'tone/build/esm/core/util/Debug.js';

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
  const [slideContent, setSlideContent] = useState({});
  const slideRefs = useRef([]);
  const formId = localStorage.getItem("submissionId");

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

  useEffect(() => {
    const fetchSlide = async (section) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/slides/id_by_section?formId=${formId}&section=${section}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        return { section, id: data[0][0], slideId: data[0][1] };
      } catch (error) {
        console.error(`Error fetching slide for section ${section}:`, error);
        return { section, error: true };
      }
    };

    const loadSlides = async () => {
      const promises = slides.map(slide => fetchSlide(slide));
      const results = await Promise.all(promises);

      const slideData = results.reduce((acc, curr) => {
        if (!curr.error) {
          acc[curr.section] = { id: curr.id, slideId: curr.slideId };
        }
        return acc;
      }, {});

      setSlideContent(slideData);
    };

    loadSlides();
  }, [formId]);
  console.log(slideContent)

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
              {
              slideContent[slide] && (
                <iframe
                  className="slides-iframe"
                  title={`Google Slides Embed ${slide}`}
                  src={`https://docs.google.com/presentation/d/${slideContent[slide].id}/embed?rm=minimal&start=false&loop=false&slide=id.${slideContent[slide].slideId}`}
                ></iframe>
              )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationCheck;
