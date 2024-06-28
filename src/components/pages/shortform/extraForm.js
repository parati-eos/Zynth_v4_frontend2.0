import React, { useState, useEffect } from "react";
import "./NativeForm.css"; // Assuming you have a CSS file for styling
import AboutCompany from "../shortform/AboutCom";
import CoverSlide from "../shortform/Coverslide";
import Problem_Overview from "../shortform/ProductOverview";
import Product_Roadmap from "../shortform/Product_Roadmap";
import System_arc from "../shortform/System_arc";
import Solutions from "../Native-Form/solution";
import Market from "../Native-Form/MarketSize";
import MobileScreen from "../shortform/MobileScreen"; // Correctly import MobileScreen
import WebScreen from "../shortform/WebScreen"; // Correctly import WebScreen
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
  const handleLogoClicked = () => {
    navigate("/applicationLanding");
  };

  const [formData, setFormData] = useState({
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
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "primaryColor" || name === "secondaryColor") {
      newValue = value === "" ? "#000000" : value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (name === "logo" || name === "mobileScreenshots" || name === "webScreenshots") {
      setIsUploadComplete(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formId = localStorage.getItem("submissionId");
    const generatedPresentationId = localStorage.getItem("generatedPresentationId");

    // Map section names to the appropriate keys
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
      "Financial Overview": "financialOverview",
      "Contact Us": "contact",
    };

    // Construct payload
    const payload = {
      formId: formId,
      formResponses: formData,
      section: sectionMapping[section],
      generatedPresentationId: generatedPresentationId,
    };
    console.log("API Payload:", payload);

    try {
      const response = await fetch("https://zynth.ai/api/submission/short-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Handle successful response
        const responseData = await response.json();
        console.log("API Response:", responseData);
        // Update state or navigate to another page if needed
      } else {
        // Handle error response
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Navbar onLogoClick={handleLogoClicked} />
      <form onSubmit={handleSubmit}>
        {section === "Cover" && (
          <CoverSlide handleChange={handleChange} formData={formData} />
        )}
        {section === "About" && (
          <AboutCompany handleChange={handleChange} formData={formData} />
        )}
        {section === "Problem Areas" && (
          <Problem_Overview handleChange={handleChange} formData={formData} />
        )}
        {section === "Solution" && (
          <Solutions handleChange={handleChange} formData={formData} />
        )}
        {section === "Market Sizing" && (
          <Market handleChange={handleChange} formData={formData} />
        )}
        {section === "Product Overview" && (
          <Product_Roadmap handleChange={handleChange} formData={formData} />
        )}
        {section === "Product Roadmap" && (
          <Product_Roadmap handleChange={handleChange} formData={formData} />
        )}
        {section === "System Architecture" && (
          <System_arc handleChange={handleChange} formData={formData} />
        )}
        {section === "Mobile App Screenshots" && (
          <MobileScreen handleChange={handleChange} />
        )}
        {section === "Web App Screenshots" && (
          <WebScreen handleChange={handleChange} />
        )}
        {section === "Business Model" && (
          <Business handleChange={handleChange} formData={formData} />
        )}
        {section === "Key Stakeholders" && (
          <KeyStakeholders handleChange={handleChange} formData={formData} />
        )}
        {section === "Customer Persona" && (
          <CustomerPersona handleChange={handleChange} formData={formData} />
        )}
        {section === "Go-to-market Strategy" && (
          <GTM handleChange={handleChange} formData={formData} />
        )}
        {section === "Track Record" && (
          <Track handleChange={handleChange} formData={formData} />
        )}
        {section === "Case Study" && (
          <Case handleChange={handleChange} formData={formData} />
        )}
        {section === "Testimonials" && (
          <Testimonials handleChange={handleChange} formData={formData} />
        )}
        {section === "Competitive Landscape" && (
          <Competition handleChange={handleChange} formData={formData} />
        )}
        {section === "Competitive Differentiation" && (
          <CompetitiveDiff handleChange={handleChange} formData={formData} />
        )}
        {section === "Founding Team" && (
          <Team handleChange={handleChange} formData={formData} />
        )}
        {section === "Contact Us" && (
          <Contact handleChange={handleChange} formData={formData} />
        )}
        {section === "Financial Overview" && (
          <Financials handleChange={handleChange} formData={formData} />
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
