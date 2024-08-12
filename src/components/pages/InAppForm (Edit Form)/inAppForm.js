import Financials from "./financial";
import "./inAppForm.css";
import Problem from "./problem";
import Team from "./team";
import Testimonials from "./testimonials";
import TrackRecord from "./trackRecord";
import MobileScreen from "./mobileScreenshot";
import WebScreen from "./webScreenshots";
import Case from './caseStudy';
import { useState } from "react";
import { Grid, TailSpin } from "react-loader-spinner"; // Import TailSpin for button loader
import  Competition from './Competition';
import TechnicalArchitecture from "./systemArchitecture";
import Solution from "./solution";
import Market from "./marketSize";
import Product from "./product";
import ProductRoadMap from "./productRoadMap";
import Business from "./business";
import CompetitiveDiff from "./competitiveDiff";
import Stakeholders from "./stakeHolders";
import CustomerPersona from "./customerPersona";
import GTM from "./gtm";
import Cover from "./cover";
import About from "./about";
import Contact from "./contact";

function InAppForm({ Title, onClose,onSubmit}) {
  const [section, setSection] = useState(Title);
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
    websiteLink: "",
    linkedinLink: "",
    contactEmail: "",
    contactPhone: "",
    financialSnapshot: "",
    revenueCost: [],
    plannedRaise: "",
    useOfFunds: [],
    percentage: "",
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state
  const [phaseValidationError, setPhaseValidationError] = useState("");
  const validatePhases = (phaseRows) => {
    const isPhase1Filled = phaseRows[0].year1 || phaseRows[0].year2 || phaseRows[0].TR;
    const isPhase2Filled = phaseRows[1].year1 && phaseRows[1].year2 && phaseRows[1].TR;
    const isPhase3Filled = phaseRows[2].year1 && phaseRows[2].year2 && phaseRows[2].TR;

    if (isPhase1Filled && (!isPhase2Filled || !isPhase3Filled)) {
      setPhaseValidationError("Please fill out all phases");
      return false;
    }

    setPhaseValidationError("");
    return true;
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "primaryColor" || name === "secondaryColor") {
      newValue = value === "" ? "#000000" : value;
    }

    if (files && files.length > 0) {
      newValue = files[0];
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (
      name === "logo" ||
      name === "mobileScreenshots" ||
      name === "webScreenshots"
    ) {
      setIsUploadComplete(files && files.length > 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       // Example phase validation check
       if (section === "Track Record" && !validatePhases(formData.trackRecord)) {
        setIsSubmitting(false);
        return;
    }
    setIsSubmitting(true); // Disable the button immediately
    setIsLoading(true);

    const formId = localStorage.getItem("submissionId");
    const generatedPresentationId = localStorage.getItem(
      "generatedPresentationId"
    );

    const sectionMapping = {
      "Cover": "about",
      "About": "companyDetails",
      "Problem Areas": "problemDescription",
      "Solution": "solutionDescription",
      "Market Sizing": "market",
      "Product Overview": "product",
      "Product Roadmap": "productRoadmap",
      "System Architecture": "technicalArchitecture",
      "Mobile App Screenshots": "mobileScreenshots",
      "Web App Screenshots": "webScreenshots",
      "Business Model": "businessModel",
      "Key Stakeholders": "keyStakeholders",
      "Customer Persona": "customerPersona",
      "Go-to-market Strategy": "goToMarket",
      "Track Record": "trackRecord",
      "Case Study": "caseStudies",
      "Testimonials": "testimonials",
      "Competitive Landscape": "competitors",
      "Competitive Differentiation": "competitiveDiff",
      "Founding Team": "teamMembers",
      "Financial Overview": "financialInfo",
      "Contact Us": "contactInfo",
    };

    const payload = {
      formId: formId,
      formResponses: formData,
      section: sectionMapping[section],
      generatedPresentationId: generatedPresentationId,
    };
    console.log(payload)

    try {
      const serverurl = process.env.REACT_APP_SERVER_URL
      const response = await fetch(
        `${serverurl}/submission/inapp-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 35000); // Close the form after 30 seconds
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false); // Enable the button again if needed
      onSubmit();
    }
  };

  return isSubmitted ? (
    <div className="presentationcheck-loadingIcon">
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
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="sectionForm-Container">
        <h2>{Title}</h2>
        <div className="sectionForm-Content h-[60vh] w-[70vh] bg-white">
          {(() => {
            switch (Title) {
              case "Cover":
                return <Cover formData={formData} handleChange={handleChange}  />;
              case "About":
                return <About formData={formData} handleChange={handleChange}  />;
                case "Track Record":
                  return (
                    <>
                      {phaseValidationError && (
                        <div className="error-message">{phaseValidationError}</div>
                      )}
                      <TrackRecord
                        formData={formData}
                        setFormData={setFormData}
                        validatePhases={validatePhases}
                      />
                    </>
                  );
              case "Founding Team":
                return <Team formData={formData} />;
              case "Financial Overview":
                return <Financials formData={formData} />;
              case "Case Study":
                return <Case formData={formData} handleChange={handleChange} />;
              case "Mobile App Screenshots":
                return <MobileScreen handleChange={handleChange} />;
              case "Web App Screenshots":
                return <WebScreen handleChange={handleChange} />;
              case "Testimonials":
                return <Testimonials formData={formData} handleChange={handleChange} />;
              case "Competitive Landscape":
                return <Competition formData={formData} handleChange={handleChange} />;
              case "System Architecture":
                return <TechnicalArchitecture formData={formData} handleChange={handleChange} />;
              case "Problem Areas":
                return <Problem formData={formData} handleChange={handleChange} />;
              case "Solution":
                return <Solution formData={formData} handleChange={handleChange} />;
              case "Market Sizing":
                return <Market formData={formData} handleChange={handleChange} />;
              case "Product Overview":
                return <Product formData={formData} handleChange={handleChange} />;
              case "Product Roadmap":
                return <ProductRoadMap formData={formData} handleChange={handleChange} />;
              case "Business Model":
                return <Business formData={formData} handleChange={handleChange} />;
              case "Competitive Differentiation":
                return <CompetitiveDiff formData={formData} handleChange={handleChange} />;
              case "Go-to-market Strategy":
                return <GTM formData={formData} handleChange={handleChange} />;
              case "Key Stakeholders":
                return <Stakeholders formData={formData} handleChange={handleChange} />;
              case "Customer Persona":
                return <CustomerPersona formData={formData} handleChange={handleChange} />;
                case "Contact Us":
                  return <Contact formData={formData} handleChange={handleChange} />;
              default:
                return null;
            }
          })()}
        </div>
        <div className="section-form-buttons">
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Close
          </button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? (
              <TailSpin height="20" width="20" color="#fff" ariaLabel="tail-spin-loading" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default InAppForm;
