import React, { useState } from "react";
// import "./extraform.css"; // Assuming you have a CSS file for styling
import AboutCompany from "../shortform/AboutCom";
import CoverSlide from "../shortform/Coverslide";
import Problem_Overview from "../shortform/ProductOverview";
import Product_Roadmap from "../shortform/Product_Roadmap";
import System_arc from "../shortform/System_arc";
import Solutions from "../Native-Form/solution";
import Market from "../Native-Form/MarketSize";
import MobileScreen from "../shortform/MobileScreen"; // Import MobileScreen
import WebScreen from "../shortform/WebScreen"; // Import WebScreen
import Product from "../Native-Form/product";
import ProductScreen from "../Native-Form/productscreen";
import Business from "../Native-Form/Business";
import KeyStakeholders from "../shortform/KeyStakeholders";
import CustomerPersona from "../shortform/Customa_Persona";
import GTM from "../shortform/Gtm_extra";
import { Track } from "../Native-Form/Track";
import Case from "../Native-Form/case";
import Testimonials from "../Native-Form/Testimonials";
import { Competition } from "../Native-Form/Competition";
import CompetitiveDiff from "../Native-Form/CompetitiveDiff";
import { Team } from "../Native-Form/Team"; // Import the Team component
import Navbar from "../../shared/js/LoginNavbar";
import Contact from "../Native-Form/contact"; // Import the Contact component
import Financials from "../Native-Form/financials"; // Import the Financials component
import { useNavigate } from "react-router-dom";

const Form = ({ initialSection, onClose }) => {
  const [section, setSection] = useState(initialSection);
  const navigate = useNavigate();
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

    if (name === "logo" || name === "mobileScreenshots" || name === "webScreenshots") {
      setIsUploadComplete(files.length > 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formId = localStorage.getItem("submissionId");
    const generatedPresentationId = localStorage.getItem("generatedPresentationId");

    const sectionMapping = {
      "Cover": "about",
      "About": "companyDetails",
      "Problem Areas": "problemDescription",
      "Solution": "solutionDescription",
      "Market Sizing": "market",
      "Product Overview": "product",
      "Product Roadmap": "productRoadmap",
      "System Architecture": "systemArchitecture",
      "Mobile App Screenshots": "mobileAppScreenshots",
      "Web App Screenshots": "webAppScreenshots",
      "Business Model": "businessModel",
      "Key Stakeholders": "keyStakeholders",
      "Customer Persona": "customerPersona",
      "Go-to-market Strategy": "goToMarketStrategy",
      "Track Record": "trackRecord",
      "Case Study": "caseStudies",
      "Testimonials": "testimonials",
      "Competitive Landscape": "competition",
      "Competitive Differentiation": "competitiveDiff",
      "Founding Team": "teamMembers",
      "Financial Overview": "financialInfo",
      "Contact Us": "contact",
    };
    console.log(formData)
    const payload = {
      formId: formId,
      formResponses: formData,
      section: sectionMapping[section],
      generatedPresentationId: generatedPresentationId,
    };

    try {
      const response = await fetch("http://localhost:5000/submission/section-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="native-form">
      <div className="form-container">
        <div className="form-details">
          <div className="section-name">
            <h2>{section}</h2>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-area">
              {section === "Cover" && (
                // <CoverSlide formData={formData} handleChange={handleChange} />
                console.log(section)
              )}
              {section === "About" && (
                // <AboutCompany formData={formData} handleChange={handleChange} />
                console.log(section)
              )}
              {section === "Problem Areas" && (
                <Market formData={formData} handleChange={handleChange} />
              )}
              {section === "Solution" && (
                <Solutions formData={formData} handleChange={handleChange} />
              )}
              {section === "Market Sizing" && (
                <Market formData={formData} handleChange={handleChange} />
              )}
              {section === "Product Overview" && (
                <Problem_Overview formData={formData} handleChange={handleChange} />
              )}
              {section === "Product Roadmap" && (
                <Product_Roadmap formData={formData} handleChange={handleChange} />
              )}
              {section === "System Architecture" && (
                <System_arc formData={formData} handleChange={handleChange} />
              )}
              {section === "Contact Us" && (
                <Contact formData={formData} handleChange={handleChange} />
              )}
              {section === "Mobile App Screenshots" && (
                <MobileScreen formData={formData} handleChange={handleChange} />
              )}
              {section === "Web App Screenshots" && (
                <WebScreen formData={formData} handleChange={handleChange} />
              )}
              {section === "Business Model" && (
                <Business formData={formData} handleChange={handleChange} />
              )}
              {section === "Key Stakeholders" && (
                <KeyStakeholders formData={formData} handleChange={handleChange} />
              )}
              {section === "Customer Persona" && (
                <CustomerPersona formData={formData} handleChange={handleChange} />
              )}
              {section === "Go-to-market Strategy" && (
                <GTM formData={formData} handleChange={handleChange} />
              )}
              {section === "Track Record" && (
                <Track formData={formData} handleChange={handleChange} setFormData={setFormData} isLoading={isLoading} />
              )}
              {section === "Case Study" && (
                <Case formData={formData} handleChange={handleChange} />
              )}
              {section === "Testimonials" && (
                <Testimonials formData={formData} handleChange={handleChange} />
              )}
              {section === "Competitive Landscape" && (
                <Competition formData={formData} handleChange={handleChange} />
              )}
              {section === "Competitive Differentiation" && (
                <CompetitiveDiff formData={formData} handleChange={handleChange} />
              )}
              {section === "Founding Team" && (
                <Team formData={formData} handleChange={handleChange} />
              )}
              {section === "Financial Overview" && (
                <Financials formData={formData} handleChange={handleChange} />
              )}
            </div>
            <div className="form-buttons">
              <div className={`form-next-button ${isLoading ? "form-next-button-disabled" : ""}`}>
                
                <button type="button" onClick={onClose}>Close</button>
                <button type="submit" disabled={isLoading}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;