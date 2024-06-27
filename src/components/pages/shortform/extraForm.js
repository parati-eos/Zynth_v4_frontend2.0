import React, { useState, useEffect } from "react";
import "./NativeForm.css"; // Assuming you have a CSS file for styling
import AboutCompany from "../Native-Form/AboutCom";
import CoverSlide from "../Native-Form/Coverslide";
import Problem from "../Native-Form/problem";
import Solutions from "../Native-Form/solution";
import Market from "../Native-Form/MarketSize";
import Product from "../Native-Form/product";
import ProductScreen from "../Native-Form/productscreen";
import Business from "../Native-Form/Business";
import GTM from "../Native-Form/GTM";
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

const Form = ({ initialSection }) => {
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

    // Construct payload
    const payload = {
      formId: '',
      formResponses: formData,
      section: section,
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }

    if (section < 5) {
      setSection((prevSection) => prevSection + 1);
    } else {
      navigate("/pages/presentationcheck");
    }
    setProgress((section / 5) * 100);
    setIsLoading(false);
  };

  return (
    <div className="native-form">
      <div className="form-container">
        <div className="form-details">
          <div className="section-name">
           
          </div>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-area">
              {section === 1 && (
                <AboutCompany formData={formData} handleChange={handleChange} />
              )}
              {section === 2 && (
                <CoverSlide formData={formData} handleChange={handleChange} />
              )}
              {section === "Market Sizing" && (
                <Market formData={formData} handleChange={handleChange} />
              )}
              {section === "Product Roadmap" && (
                <Product formData={formData} handleChange={handleChange} />
              )}
              {section === "System Architecture" && (
                <Product formData={formData} handleChange={handleChange} />
              )}
              {section === 5 && (
                <Contact formData={formData} handleChange={handleChange} />
              )}
              {section === 7 && (
                <ProductScreen
                  formData={formData}
                  handleChange={handleChange}
                />
              )} 
              {section === 8 && (
                <Business formData={formData} handleChange={handleChange} />
              )}
              {section === 9 && (
                <GTM formData={formData} handleChange={handleChange} />
              )}
              {section === "" && (
                <Track
                  formData={formData}
                  handleChange={handleChange}
                  setFormData={setFormData} 
                  isLoading={isLoading}
                />
              )}
            {section === 11 && (
                <Case formData={formData} handleChange={handleChange} />
              )}
              {section === "Testimonials" && (
                <Testimonials formData={formData} handleChange={handleChange} />
              )}
              {section === 13 && (
                <Competition formData={formData} handleChange={handleChange} />
              )}
              {section === 14 && (
                <CompetitiveDiff
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {section === 15 && (
                <Team formData={formData} handleChange={handleChange} />
              )}
              {section === 16 && <Financials formData={formData} />}{" "}
             
            </div>
            <div className="form-buttons">
              <div
                className={`form-next-button ${
                  isLoading ? "form-next-button-disabled" : ""
                }`}
              >
                <button type="submit" disabled={isLoading || !isUploadComplete}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
