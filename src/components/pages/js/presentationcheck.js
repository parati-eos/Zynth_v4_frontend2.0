import React, { useState, useEffect, useRef } from "react";
import "../css/presentationcheck.css";
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
import { Team, TeamProvider, useTeamData } from "../shortform/Team.js"; // Import the form component
import Form from "../shortform/extraForm.js";
import {
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';

const slides = [
  "Cover",
  "About",
  "Problem Areas",
  "Solution",
  "Market Sizing",
  "Product Overview",
  "Product Roadmap",
  "System Architecture",
  "Mobile App Screenshots",
  "Web App Screenshots",
  "Business Model",
  "Key Stakeholders",
  "Customer Persona",
  "Go-to-market Strategy",
  "Track Record",
  "Case Study",
  "Testimonials",
  "Competitive Landscape",
  "Competitive Differentiation",
  "Founding Team",
  "Financial Overview",
  "Contact Us",
];

const PresentationCheck = () => {
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [slideContent, setSlideContent] = useState({});
  const [fetchError, setFetchError] = useState({});
  const slideRefs = useRef([]);
  const formId = localStorage.getItem("submissionId");
  const userEmail = localStorage.getItem("userEmail");

  

  const [formData, setFormData] = useState({
    userId: userEmail,
    companyName: "",
    tagline: "",
    logo: null,
    primaryColor: "#000000",
    secondaryColor: "#000000",
    establishmentYear: "",
    companyOverview: "",
    problemDescription: "",
    solutionsDescription: "",
    sector: "",
    otherSector: "",
    marketDescription: "",
    TAM: "",
    TAMGrowthRate: "",
    SAM: "",
    SAMGrowthRate: "",
    productOverview: "",
    productRoadmap: "",
    productRoadmapDescription: "",
    technicalArchitecture: "",
    appType: "",
    mobileScreenshots: [],
    webScreenshots: [],
    businessModel: "",
    keyStakeholders: "",
    customerPersona: "",
    goToMarketStrategy: "",
    trackRecord: [],
    caseStudies: "",
    testimonials: [],
    competitors: [],
    competitiveDiff: "",
    teamMembers: [],
    // Add contact information fields
    websiteLink: "",
    linkedinLink: "",
    contactEmail: "",
    contactPhone: "",
    // Add financial information fields
    financialSnapshot: "",
    revenueCost: [],
    plannedRaise: "",
    useOfFunds: [],
    percentage: "",
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slide = entry.target.getAttribute("data-slide");
          setSelectedSlide(slide);
        }
      });
    }, observerOptions);

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      slideRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSidebarClick = (slide, index) => {
    setSelectedSlide(slide);
    slideRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFetchSlide = async (slide) => {
    try {
      const response = await fetch(
        `https://zynth.ai/api/slides/id_by_section?formId=${formId}&section=${slide}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const slideId = data[0][1];
      setSlideContent((prevState) => ({
        ...prevState,
        [slide]: { id: data[0][0], slideId },
      }));
      // Clear error if previously set
      setFetchError((prevState) => ({
        ...prevState,
        [slide]: null,
      }));
    } catch (error) {
      console.error(`Error fetching slide for section ${slide}:`, error);
      // Set error state for the specific slide
      setFetchError((prevState) => ({
        ...prevState,
        [slide]:
          error.message || "Failed to fetch slide. Please try again later.",
      }));
    }
  };

  useEffect(() => {
    const loadSlides = async () => {
      const promises = slides.map((slide) => handleFetchSlide(slide));
      await Promise.all(promises);
    };

    loadSlides();
  }, [formId]);

  // Render content based on slide fetch status

  const RenderSlideContent = (slide) => {
    const [showForm, setShowForm] = useState(false);
    const handleToggleForm = () => {
      setShowForm(!showForm);
    };
    if (slideContent[slide]?.slideId === undefined) {


      return (
        <div>
        <IconButton onClick={handleToggleForm} color="primary" aria-label="add">
          {showForm ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
        {showForm && <Form initialSection={slide} onClose={handleToggleForm} />}
      </div>
      );
    } else if (
      slideContent[slide] &&
      slideContent[slide].id &&
      slideContent[slide].slideId
    ) {
      return (
        <iframe
          className="slides-iframe"
          title={`Google Slides Embed ${slide}`}
          src={`https://docs.google.com/presentation/d/${slideContent[slide].id}/embed?rm=minimal&start=false&loop=false&slide=id.${slideContent[slide].slideId}`}
          style={{ width: "120vh", height: "70vh" }}
        ></iframe>
      );
    } else {
      // Initial loading state
      return (
        <div>
          <h2>{slide}</h2>
          <p>Loading...</p>
          {/* Show Fetch Slide button only if there's no fetch error */}
          {!fetchError[slide] && (
            <button
              className="fetch-button"
              onClick={() => handleFetchSlide(slide)}
            >
              Fetch Slide
            </button>
          )}
        </div>
      );
    }
  };

  // Dummy function for form submission (replace with actual logic)
  const handleFormSubmit = (formData) => {
    console.log("Form submitted with:", formData);
    // Handle form submission logic here (e.g., send data to backend)
  };

  return (
    <div className="presentation-check-container1">
      <ApplicationNavbar />
      <div className="presentation-check-container">
        <div className="sidebar">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`sidebar-item ${
                selectedSlide === slide ? "active" : ""
              }`}
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
              ref={(el) => (slideRefs.current[index] = el)}
            >
              {RenderSlideContent(slide)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationCheck;
