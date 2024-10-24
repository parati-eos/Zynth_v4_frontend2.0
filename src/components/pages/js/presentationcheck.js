import React, { useState, useEffect, useRef } from "react";
import "../css/presentationcheck.css";
import ApplicationNavbar from "../../shared/js/ApplicationNavbar.js";
import SectionForm from "../sectionForm/sectionForm.js";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import sectionMapping from "../utils/sectionMapping.js";
import { Grid } from "react-loader-spinner";
import FloatingButtons from "./FloatingButtons.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import InAppForm from "../InAppForm (Edit Form)/inAppForm.js";
import PaymentGateway from "../Payment/PaymentGateway.js";
import GuidedTour from "../utils/GuidedTour.js";
import { useLocation } from "react-router-dom";
import CouponModal from "../../pages/cards/CouponModal.js";
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

const excludedSections = [
  "Track Record",
  "Testimonials",
  "Founding Team",
  "Financial Overview",
  "Mobile App Screenshots",
  "Web App Screenshots",
  "Case Study",
  "Competitive Landscape",
  "System Architecture",
];

const PresentationCheck = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [slideContent, setSlideContent] = useState({});
  const [fetchError, setFetchError] = useState({});
  const slideRefs = useRef([]);
  const userEmail = localStorage.getItem("userEmail");
  const location = useLocation();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const formId = searchParams.get("submissionID")|| localStorage.getItem("submissionId");
  const generatedPresentationId = searchParams.get("generatedPresentationId")||localStorage.getItem("generatedPresentationId");
  // const [isOpen, setIsOpen] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const discountParam = searchParams.get("discount");
// Check if submissionID is found in the URL search params
useEffect(() => {
  console.log('Discount param:', discountParam);
  if (discountParam) {
    console.log('Opening modal');
    setIsModalOpen(true);
  }
}, [discountParam]);

const handleCloseModal = () => {
  setIsModalOpen(false); // Close modal
};

const handleApplyCoupon = (couponCode, discountAmount) => {
  console.log('Coupon applied:', couponCode, 'Discount Amount:', discountAmount);

  // Close the modal on successful coupon application
  handleCloseModal();

  // Remove the discount parameter from the URL
  const params = new URLSearchParams(location.search);
  params.delete('discount'); // Remove the discount parameter
  history.replace({ search: params.toString() }); // Update the URL without reloading
};

if (formId) {
  // If formId is present, construct the API URL
  const apiUrl = `${serverurl}/files/getUserId?submissionID=${formId}`;

  // Fetch user ID from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const apiUserId = data.UserID;

      // Compare the API user ID with the user email in localStorage
      if (apiUserId !== userEmail) {
        // Show an alert if the email does not match
        alert("Please log in with your original email to perform this action.");
        // Navigate to the login page
        window.location.href = "https://zynth.ai/auth/login";
      } else {
        // If the emails match, proceed to fetch the presentation
        fetch(`${serverurl}/slides/presentation?formId=${formId}`)
          .then(response => response.json())
          .then(presentationData => {
            // Store the generatedPresentationId in localStorage
            localStorage.setItem("generatedPresentationId", presentationData.PresentationID);
          })
          .catch(error => {
            console.error("Error fetching presentation:", error);
          });
      }
    })
    .catch(error => {
      console.error("Error fetching user ID:", error);
    });
} else {
  // Show an alert if submissionID is not found
  alert("Submission ID not found. Please make sure you are logged in with the correct account.");
  // Navigate to the login page
  window.location.href = "https://zynth.ai/auth/login";
}
  useEffect(() => {
        // Check if the environment is zynth.ai
        const isZynthAI = window.location.hostname === 'zynth.ai';

        if (isZynthAI) {
            const handleContextMenu = (event) => {
                event.preventDefault();
            };

            const handleKeyDown = (event) => {
                if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
                    event.preventDefault();
                }
            };

            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);


    const handleDownload = async () => {
      try {
        const formId = searchParams.get("submissionID") || localStorage.getItem("submissionId");
        if (!formId) {
          throw new Error("Form ID not found in localStorage");
        }

        const serverurl = process.env.REACT_APP_SERVER_URL;
        // 1. First, update the payment status
        const updatePaymentStatus = async () => {
          const response = await fetch(`${serverurl}/appscript/updatePaymentStatus`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ FormID: formId, paymentStatus: 1 }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          console.log("Payment status updated:", result);
        };

        // Call payment status update
        await updatePaymentStatus();

        // 2. Then, call the additional API to get presentationID
        const callAdditionalApi = async () => {
          const response = await fetch(`${serverurl}/slides/presentation?formId=${formId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("Additional API response:", result);

          const presentationID = result.PresentationID; // Extract PresentationID from response

          if (presentationID) {
            // Call the second API with the extracted presentationID
            const secondApiResponse = await fetch(`https://script.google.com/macros/s/AKfycbyUR5SWxE4IHJ6uVr1eVTS7WhJywnbCNBs2zlJsUFbafyCsaNWiGxg7HQbyB3zx7R6z/exec?presentationID=${presentationID}`);
            const secondApiText = await secondApiResponse.text();
            console.log("Raw second API response:", secondApiText);

            try {
              const secondApiResult = JSON.parse(secondApiText);
              console.log("Second API parsed response:", secondApiResult);
            } catch (jsonError) {
              console.error("Error parsing second API response as JSON:", jsonError);
            }
          } else {
            throw new Error("PresentationID not found in the response");
          }
        };

        // Call additional API
        await callAdditionalApi();

        // 3. Finally, call the original slides URL API
        const response = await fetch(`${serverurl}/slides/url?formId=${formId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Result:", result);

        const url = result.PresentationURL;
        console.log("URL:", url);

        if (!url || typeof url !== "string") {
          throw new Error("Invalid URL in response");
        }
        window.open(url, "_blank");
      } catch (error) {
        console.error("Error exporting presentation:", error);
        alert(
          "Oops! It seems like the pitch deck presentation is missing. Click 'Generate Presentation' to begin your journey to success!"
        );
      }
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
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      alert("Sharing is not supported on this device/browser.");
    }
  };

  const handleSidebarClick = (slide, index) => {
    setSelectedSlide(slide);
    slideRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTriggerClick = async (section) => {
    const data = {
      section: sectionMapping[section],
      userId: userEmail,
      formId,
      generatedPresentationId,
    };
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/appscript/triggerAppScript`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);
      alert(`Triggered successfully for ${section}`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to trigger for ${section}: ${error.message}`);
    }
  };
  const checkPaymentStatusAndProceed = async () => {
    try {
      const response = await fetch(`${serverurl}/slides/url?formId=${formId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data); // Debugging line

      if (data && data.paymentStatus === 1) {
        // Payment has already been made, run handleDownload
        handleDownload();
      } else if (data && data.paymentStatus === 0) {
        // Payment is not made, open the payment gateway
        document.getElementById('payment-button').click();
      } else {
        alert("Unable to determine payment status.");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      alert("Error checking payment status. Please try again.");
    }
  };

    const startTour = () => {
    setTourActive(true);
  };

  const RenderSlideContent = (slide) => {
    const [sectionSubmitStatus, setSectionSubmitStatus] = useState({});
    const requiresForm = excludedSections.includes(slide);
    const [loading, setLoading] = useState(
      !requiresForm || sectionSubmitStatus[slide] === true
    );
    const [inAppForm, setinAppForm] = useState(requiresForm);
    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [prevData, setPrevData] = useState(null);
    const [runFunction, setRunFunction] = useState(true); //!requiresForm
    const [FetchedData, setFetchedData] = useState(null);
    const formRef = useRef(null);

    const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
      setRunFunction(true); // Reset the runFunction when edit mode is toggled
    };
    useEffect(() => {
      console.log('Setting tourActive to true');
      // Automatically start the tour or open dialog box on page load
      setTourActive(true); // Set to true to open the dialog or start the tour
    }, []);
    useEffect(() => {
      if (showForm && formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [showForm]);

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

    const fetchData = async () => {
      try {
        const serverurl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(
          `${serverurl}/slides/id_by_section?formId=${formId}&section=${slide}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFetchedData(data);
        console.log(data)

        if (
          data[0] &&
          data[0][1] &&
          (data[0][1] !== "error" ||
          data[0][1] !== null)
        ) {
          setPrevData(data);
          setSlideContent((prevState) => ({
            ...prevState,
            [slide]: { id: data[0][0], slideId: data[0][1] },
          }));
          setRunFunction(false);
          setLoading(false);
          setinAppForm(false);
        } else if (data[0] && data[0][1] === "error") {
          setinAppForm(true);
          setLoading(false);
          setRunFunction(false);
        } else {
          setLoading(true);
          setRunFunction(true);
        }
      } catch (error) {
        console.error(`Error fetching slide for section ${slide}:`, error);
        setLoading(true);
        setRunFunction(true);
      }
    };

    useEffect(() => {
      if (runFunction && slide === selectedSlide && !isEditMode) {
        fetchData();
        setLoading(sectionSubmitStatus[slide] !== false);
      }

      const interval = setInterval(() => {
        if (runFunction && slide === selectedSlide && !isEditMode) {
          console.log(slide)
          fetchData();
        }
      }, 10000);

      return () => clearInterval(interval);
    }, [selectedSlide, isEditMode]);

    const handleFormSubmit = async () => {
      try {
        if (requiresForm) {
          setLoading(true);
          setRunFunction(true);
          setinAppForm(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Set the inAppForm state to true if there's an error
        setinAppForm(true);
      }
    };

    if(slide===selectedSlide){
      const data = {
        'Slide': slide,
        'In App Form': inAppForm,
        'Loading': loading,
        'Run Function': runFunction,
        'Data': FetchedData ? FetchedData[0][1] : "no data"
      };
      
      console.table(data);
      
    }

    if (!requiresForm) {
      if (inAppForm) {
        return (
          <>
            <IconButton
              onClick={() => handleTriggerClick(slide)}
              color="primary"
              aria-label="add"
              sx={{ fontSize: 40 }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <h3>{slide}</h3>
          </>
        );
      } else if (loading) {
        return (
          <div className="presentationcheck-loadingIcon">
            <div className="presentationcheck-loadingIcon">
            <div>
              {isEditMode ? (
                <InAppForm
                  Title={slide}
                  onClose={() => setIsEditMode(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="slide-presentation-container">
                  <div className="edit-button">
                    <FontAwesomeIcon
                     id="editicon"
                      icon={faEdit}
                      onClick={toggleEditMode}
                      title="Edit Slide"
                    />

                  </div>
                  <div className="loading-grid">
                  <Grid
                    visible={true}
                    height={80}
                    width={80}
                    color="#E6A500"
                    ariaLabel="grid-loading"
                    radius={12.5}
                    wrapperStyle={{}}
                    wrapperClass="grid-wrapper"
                  />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        );
      } else if (slideContent[slide]) {
        return (
          <div >
            <div>
              {isEditMode ? (
                <InAppForm
                  Title={slide}
                  onClose={() => setIsEditMode(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="slide-presentation-container">
                  <div className="edit-button" id="editicon">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={toggleEditMode}
                      title="Edit Slide"
                    />
                    {/* <GuidedTour active={tourActive} /> */}
                  </div>
                  <iframe
                    className="presentationcheck-slides-iframe"
                    title={`Google Slides Embed ${slide}`}
                    src={`https://docs.google.com/presentation/d/${slideContent[slide].id}/embed?rm=minimal&start=false&loop=false&slide=id.${slideContent[slide].slideId}`}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        );
      }
    } else {
      if (inAppForm ) {
        return (
          <div className="w-full h-full flex justify-center items-center">
            {!showForm && (
              <div className="w-[80vw] md:w-[30vw] flex flex-col justify-center items-center">
                <div className="h-[15vw] w-[15vw] md:h-max md:w-max flex justify-center items-center border border-blue-600 rounded-[50%]">
                  <IconButton id="addicon"
                    onClick={() => setShowForm(true)}
                    color="inherit"
                    aria-label="add"
                    sx={{
                      fontSize: { xs: 30, sm: 40 },
                      color: { xs: "white", sm: "white" }
                    }}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <h3 className="text-lg md:text-xl">{slide}</h3>
              </div>
            )}
            {showForm && (
              <div
                ref={formRef}
                className="w-full h-full flex justify-center items-center"
              >
                <SectionForm
                  Title={slide}
                  onClose={() => setShowForm(false)}
                  onSubmit={handleFormSubmit}
                  setSectionSubmitStatus={setSectionSubmitStatus}
                />
              </div>
            )}
          </div>
        );
      } else if (loading) {
        return (
          <div className="presentationcheck-loadingIcon">
            <div className="presentationcheck-loadingIcon">
            <div>
              {isEditMode ? (
                <InAppForm
                  Title={slide}
                  onClose={() => setIsEditMode(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="slide-presentation-container">
                  <div className="edit-button" id="editicon">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={toggleEditMode}
                      title="Edit Slide"
                    />
                  {/* <GuidedTour active={tourActive} /> */}
                  </div>
                  <div className="loading-grid">
                  <Grid
                    visible={true}
                    height={80}
                    width={80}
                    color="#E6A500"
                    ariaLabel="grid-loading"
                    radius={12.5}
                    wrapperStyle={{}}
                    wrapperClass="grid-wrapper"
                  />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        );
      } else {
        return (
          <div >
            <div>
              {isEditMode ? (
                <InAppForm
                  Title={slide}
                  onClose={() => setIsEditMode(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                <div className="slide-presentation-container">
                  <div className="edit-button" id="editicon">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={toggleEditMode}
                      title="Edit Slide"
                    />
                  {/* <GuidedTour active={tourActive} /> */}
                  </div>
                  <iframe
                    className="presentationcheck-slides-iframe"
                    title={`Google Slides Embed ${slide}`}
                    src={`https://docs.google.com/presentation/d/${slideContent[slide].id}/embed?rm=minimal&start=false&loop=false&slide=id.${slideContent[slide].slideId}`}
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="presentation-check-container1">
      <ApplicationNavbar />
      <div className="sidebar-hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>
      <div className="presentation-check-container">
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              <div
                className={`sidebar-item ${
                  selectedSlide === slide ? "active" : ""
                }`}
                onClick={() => {
                  handleSidebarClick(slide, index);
                  toggleSidebar();
                }}
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
      <FloatingButtons
        handleShare={handleShare}
        handleExport={checkPaymentStatusAndProceed}
      />
      <PaymentGateway
        productinfo="Presentation Export"
        onSuccess={handleDownload}
        formId={formId}
      />
   <GuidedTour active={tourActive} />
   <CouponModal
        isOpen={isModalOpen} // Pass modal visibility state
        onClose={handleCloseModal} // Pass the close function
        applyCoupon={handleApplyCoupon} // Pass the coupon application function
      />
    </div>
  );
};
export default PresentationCheck;