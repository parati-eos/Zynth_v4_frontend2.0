import React, { useState, useEffect, useRef } from "react";
import "../css/presentationcheck.css";
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
import Form from "../shortform/extraForm.js";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import GetAppIcon from "@mui/icons-material/GetApp";
import sectionMapping from "../shortform/utils/sectionMapping.js";
import { Grid as Loader } from "react-loader-spinner";

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
  const [loadingSlides, setLoadingSlides] = useState({});
  const slideRefs = useRef([]);
  const formId = localStorage.getItem("submissionId");
  const userEmail = localStorage.getItem("userEmail");
  const generatedPresentationId = localStorage.getItem(
    "generatedPresentationId"
  );
  const [PPTName, setPPTName] = useState("Your Presentation Name");
  const [isEditing, setIsEditing] = useState(false);

  const handleFetchSlide = async (slide) => {
    setLoadingSlides((prev) => ({ ...prev, [slide]: true }));
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
      setFetchError((prevState) => ({
        ...prevState,
        [slide]: null,
      }));
    } catch (error) {
      console.error(`Error fetching slide for section ${slide}:`, error);
      setFetchError((prevState) => ({
        ...prevState,
        [slide]:
          error.message || "Failed to fetch slide. Please try again later.",
      }));
    } finally {
      setLoadingSlides((prev) => ({ ...prev, [slide]: false }));
    }
  };

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

  useEffect(() => {
    handleFetchSlide(selectedSlide);
  }, [selectedSlide, formId]);

  const handleTriggerClick = async (section) => {
    const data = {
      section: sectionMapping[section],
      userId: userEmail,
      formId,
      generatedPresentationId,
    };

    try {
      const response = await fetch(
        `https://zynth.ai/api/appscript/triggerAppScript`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(`Triggered successfully for ${section}`);
    } catch (error) {
      alert(`Failed to trigger for ${section}: ${error.message}`);
    }
  };

  const RenderSlideContent = (slide) => {
    const [showForm, setShowForm] = useState(false);
    const handleToggleForm = () => {
      setShowForm(!showForm);
    };

    const requiresForm = [
      "Track Record",
      "Testimonials",
      "Founding Team",
      "Financial Overview",
      "Mobile App Screenshots",
      "Web App Screenshots",
    ].includes(slide);

    if (slideContent[slide]?.slideId === undefined) {
      if (!requiresForm) {
        return (
          <IconButton
            onClick={() => handleTriggerClick(slide)}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </IconButton>
        );
      } else {
        return (
          <div>
            <IconButton
              onClick={handleToggleForm}
              color="primary"
              aria-label="add"
            >
              {showForm ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
            {showForm && (
              <Form initialSection={slide} onClose={handleToggleForm} />
            )}
          </div>
        );
      }
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
          style={{ width: "149.3333vh", height: "84vh" }}
        ></iframe>
      );
    } else {
      return (
        <div>
          <h2>{slide}</h2>
          {loadingSlides[slide] ? (
            <Loader
              visible={true}
              height="80"
              width="80"
              color="#E6A500"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
          ) : (
            <p>Loading...</p>
          )}
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

  const handleSidebarClick = (slide, index) => {
    setSelectedSlide(slide);
    slideRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShare = () => {
    const uniqueShareableUrl = `https://zynth.ai/share?submissionId=${formId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Share Presentation",
          text: "Check out this presentation",
          url: uniqueShareableUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed: ", error));
    } else if (navigator.clipboard && navigator.platform.includes("Mac")) {
      // For macOS devices where navigator.share is not available
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      // For other devices where neither navigator.share nor clipboard API is available
      alert("Sharing is not supported on this device/browser.");
    }
  };

  const handleDownload = () => {
    // Implement export/download functionality here
    alert("Export functionality to be implemented.");
  };

  const handleSave = () => {
    // Implement save functionality here
    // Example:
    alert(`Saved as: ${PPTName}`);
  };

  const handleNameChange = (event) => {
    setPPTName(event.target.value);
  };

  return (
    <div className="presentation-check-container1">
      <ApplicationNavbar />
      <div className="presentation-check-container">
        <div className="sidebar">
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              <div
                className={`sidebar-item ${
                  selectedSlide === slide ? "active" : ""
                }`}
                onClick={() => handleSidebarClick(slide, index)}
              >
                {slide}
              </div>
              {index < slides.length - 1 && <div className="separator"></div>}
            </React.Fragment>
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
      <div className="presentation-footer">
        {isEditing ? (
          <input
            type="text"
            value={PPTName}
            onBlur={handleSave}
            onChange={handleNameChange}
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>
            <span>{PPTName}</span>
          </h2>
        )}
        <div className="share-export">
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleDownload}>
            <GetAppIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PresentationCheck;
