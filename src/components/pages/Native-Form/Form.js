import React, { useState, useEffect } from "react";
import "./NativeForm.css"; // Assuming you have a CSS file for styling
import AboutCompany from "./AboutCom";
import CoverSlide from "./Coverslide";
import Problem from "./problem";
import Solutions from "./solution";
import Market from "./MarketSize";
import Product from "./product";
import ProductScreen from "./productscreen";
import Business from "./Business";
import GTM from "./GTM";
import { Track } from "./Track";
import Case from "./case";
import Testimonials from "./Testimonials";
import { Competition } from "./Competition";
import CompetitiveDiff from "./CompetitiveDiff";
import { Team } from "./Team"; // Import the Team component
import Navbar from "../../shared/js/LoginNavbar";
import Contact from "./contact"; // Import the Contact component
import Financials from "./financials"; // Import the Financials component
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [section, setSection] = useState(1);
  const navigate = useNavigate();
  const handleLogoClicked = () => {
    navigate("/applicationLanding");
  };
  const userEmail = localStorage.getItem("userEmail");
  const [generatedPresentationID, setgeneratedPresentationID] = useState(null);
  const [showHiddenButton, setShowHiddenButton] = useState(false); // State to control button visibility
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
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  // Remove the duplicate declaration of 'navigate'
  // const navigate = useNavigate(); // Initialize useHistory hook
  const [formId, setFormId] = useState("");
  const handleHiddenButtonClick = async () => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbx4hxwmEMxDckdgCO4eR_RoXnT92Ewl0rr4x2trb-fGbd6rUqATaS_e5rHIM2lUTsYQ/exec?userID=${localStorage.getItem(
          "userEmail"
        )}&submissionID=${formId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.text();
      console.log("API Response:", responseData); // Log the entire response
      await setgeneratedPresentationID(responseData);
      // Attempt to parse response data as JSON
      const data = JSON.parse(responseData);
      console.log(data + "is here !");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleHiddenButtonClick(); // Call the function after 3 seconds
      setShowHiddenButton(false); // Optionally set showHiddenButton to true if you want to display the button
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const generateFormId = () => {
    // Generate a random unique ID using timestamp and random numbers
    return "Parati-" + Date.now();
  };

  useEffect(() => {
    // Generate a unique form ID when the component mounts for the first time
    const newFormId = generateFormId();
    localStorage.setItem("submissionId", newFormId);
    setFormId(newFormId);
    console.log("Form ID:", newFormId);
    // Fetch user email from local storage
    const userEmail = localStorage.getItem("userEmail");
    console.log("User Email:", userEmail);

    //Setting local variables for check on next button click.
    localStorage.setItem("companyName", formData.companyName);
    localStorage.setItem("tagline", formData.tagline);
    localStorage.setItem("logo", formData.logo);
    localStorage.setItem("primaryColor", formData.primaryColor);
    localStorage.setItem("secondaryColor", formData.secondaryColor);
    localStorage.setItem("establishmentYear", formData.establishmentYear);
    localStorage.setItem("companyOverview", formData.companyOverview);
    localStorage.setItem("problemDescription", formData.problemDescription);
    localStorage.setItem("solutionsDescription", formData.solutionsDescription);
    localStorage.setItem("sector", formData.sector);
    localStorage.setItem("otherSector", formData.otherSector);
    localStorage.setItem("marketDescription", formData.marketDescription);
    localStorage.setItem("TAM", formData.TAM);
    localStorage.setItem("TAMGrowthRate", formData.TAMGrowthRate);
    localStorage.setItem("SAM", formData.SAM);
    localStorage.setItem("SAMGrowthRate", formData.SAMGrowthRate);
    localStorage.setItem("productOverview", formData.productOverview);
    localStorage.setItem("productRoadmap", formData.productRoadmap);
    localStorage.setItem(
      "productRoadmapDescription",
      formData.productRoadmapDescription
    );
    localStorage.setItem(
      "technicalArchitecture",
      formData.technicalArchitecture
    );

    localStorage.setItem("appType", formData.appType);
    localStorage.setItem("mobileScreenshots", formData.mobileScreenshots);
    localStorage.setItem("webScreenshots", formData.webScreenshots);
    localStorage.setItem("businessModel", formData.businessModel);
    localStorage.setItem("keyStakeholders", formData.keyStakeholders);
    localStorage.setItem("customerPersona", formData.customerPersona);
    localStorage.setItem("goToMarketStrategy", formData.goToMarketStrategy);
    localStorage.setItem("trackRecord", formData.trackRecord);
    localStorage.setItem("caseStudies", formData.caseStudies);
    localStorage.setItem("testimonials", formData.testimonials);
    localStorage.setItem("competitors", formData.competitors);
    localStorage.setItem("competitiveDiff", formData.competitiveDiff);
    localStorage.setItem("teamMembers", formData.teamMembers);
    localStorage.setItem("websiteLink", formData.websiteLink);
    localStorage.setItem("linkedinLink", formData.linkedinLink);
    localStorage.setItem("contactEmail", formData.contactEmail);
    localStorage.setItem("contactPhone", formData.contactPhone);
    localStorage.setItem("financialSnapshot", formData.financialSnapshot);
    localStorage.setItem("revenueCost", formData.revenueCost);
    localStorage.setItem("plannedRaise", formData.plannedRaise);
    localStorage.setItem("useOfFunds", formData.useOfFunds);
    localStorage.setItem("percentage", formData.percentage);
  }, []); // Empty dependency array to run this effect only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Check if the value is empty
    if (name === "primaryColor" || name === "secondaryColor") {
      newValue = value === "" ? "#000000" : value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    // Check if the photo upload action is complete for logo or mobileScreenshots
    if (
      name === "logo" ||
      name === "mobileScreenshots" ||
      name === "webScreenshots"
    ) {
      setIsUploadComplete(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validation logic to check if all mandatory fields are filled
    // Add your validation logic here
    // Log the form data along with form ID and user email
    console.log("Form ID:", formId);
    console.log("User Email:", localStorage.getItem("userEmail"));
    console.log("Form Data:", formData);

    // Construct payload
    const userEmail = localStorage.getItem("userEmail");
    const formResponses = [userEmail];
    const sectionNames = [
      "about",
      "companyDetails",
      "problemDescription",
      "solutionDescription",
      "market",
      "product",
      "productScreen",
      "businessModel",
      "goToMarket",
      "trackRecord",
      "caseStudies",
      "testimonials",
      "competitors",
      "competitiveDiff",
      "teamMembers",
      "financialInfo",
      "contactInfo",
    ];
    const payload = {
      formId: formId,
      formResponses: formData,
      generatedPresentationId: generatedPresentationID,
      section: sectionNames[section - 1],
    };
    console.log("API Payload:", payload); // Log the payload before sending

    var changedData = false;

    if (
      section === 1 &&
      (localStorage.getItem("companyName") != formData.companyName ||
        localStorage.getItem("tagline") != formData.tagline ||
        localStorage.getItem("logo") != formData.logo ||
        localStorage.getItem("primaryColor") != formData.primaryColor ||
        localStorage.getItem("secondaryColor") != formData.secondaryColor)
    ) {
      changedData = true;
    } else if (
      section === 2 &&
      (localStorage.getItem("establishmentYear") !=
        formData.establishmentYear ||
        localStorage.getItem("companyOverview") != formData.companyOverview)
    ) {
      changedData = true;
    } else if (
      section === 3 &&
      localStorage.getItem("problemDescription") != formData.problemDescription
    ) {
      changedData = true;
    } else if (
      section === 4 &&
      localStorage.getItem("solutionsDescription") !=
        formData.solutionsDescription
    ) {
      changedData = true;
    } else if (
      section === 5 &&
      (localStorage.getItem("sector") != formData.sector ||
        localStorage.getItem("otherSector") != formData.otherSector ||
        localStorage.getItem("marketDescription") !=
          formData.marketDescription ||
        localStorage.getItem("TAM") != formData.TAM ||
        localStorage.getItem("TAMGrowthRate") != formData.TAMGrowthRate ||
        localStorage.getItem("SAM") != formData.SAM ||
        localStorage.getItem("SAMGrowthRate") != formData.SAMGrowthRate)
    ) {
      changedData = true;
    } else if (
      section === 6 &&
      (localStorage.getItem("productOverview") != formData.productOverview ||
        localStorage.getItem("productRoadmap") != formData.productRoadmap ||
        localStorage.getItem("productRoadmapDescription") !=
          formData.productRoadmapDescription ||
        localStorage.getItem("technicalArchitecture") !=
          formData.technicalArchitecture)
    ) {
      changedData = true;
    } else if (
      section === 7 &&
      (localStorage.getItem("appType") != formData.appType ||
        localStorage.getItem("mobileScreenshots") !=
          formData.mobileScreenshots ||
        localStorage.getItem("webScreenshots") != formData.webScreenshots)
    ) {
      changedData = true;
    } else if (
      section === 8 &&
      localStorage.getItem("businessModel") != formData.businessModel
    ) {
      changedData = true;
    } else if (
      section === 9 &&
      (localStorage.getItem("keyStakeholders") != formData.keyStakeholders ||
        localStorage.getItem("customerPersona") != formData.customerPersona ||
        localStorage.getItem("goToMarketStrategy") !=
          formData.goToMarketStrategy)
    ) {
      changedData = true;
    } else if (
      section === 10 &&
      localStorage.getItem("trackRecord") != formData.trackRecord
    ) {
      changedData = true;
    } else if (
      section === 11 &&
      localStorage.getItem("caseStudies") != formData.caseStudies
    ) {
      changedData = true;
    } else if (
      section === 12 &&
      localStorage.getItem("testimonials") != formData.testimonials
    ) {
      changedData = true;
    } else if (
      section === 13 &&
      localStorage.getItem("competitors") != formData.competitors
    ) {
      changedData = true;
    } else if (
      section === 14 &&
      localStorage.getItem("competitiveDiff") != formData.competitiveDiff
    ) {
      changedData = true;
    } else if (
      section === 15 &&
      localStorage.getItem("teamMembers") != formData.teamMembers
    ) {
      changedData = true;
    } else if (
      section === 16 &&
      (localStorage.getItem("financialSnapshot") !=
        formData.financialSnapshot ||
        localStorage.getItem("revenueCost") != formData.revenueCost ||
        localStorage.getItem("plannedRaise") != formData.plannedRaise ||
        localStorage.getItem("useOfFunds") != formData.useOfFunds ||
        localStorage.getItem("percentage") != formData.percentage)
    ) {
      changedData = true;
    } else if (
      section === 17 &&
      (localStorage.getItem("websiteLink") != formData.websiteLink ||
        localStorage.getItem("linkedinLink") != formData.linkedinLink ||
        localStorage.getItem("contactEmail") != formData.contactEmail ||
        localStorage.getItem("contactPhone") != formData.contactPhone)
    ) {
      changedData = true;
    }
    console.log(
      "-----------------------" + changedData + "----------------------------"
    );
    if (changedData) {
      try {
        const response = await fetch("https://zynth.ai/api/submission", {
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
      //Setting local variables for check on next button click.
      localStorage.setItem("companyName", formData.companyName);
      localStorage.setItem("tagline", formData.tagline);
      localStorage.setItem("logo", formData.logo);
      localStorage.setItem("primaryColor", formData.primaryColor);
      localStorage.setItem("secondaryColor", formData.secondaryColor);

      localStorage.setItem("establishmentYear", formData.establishmentYear);
      localStorage.setItem("companyOverview", formData.companyOverview);

      localStorage.setItem("problemDescription", formData.problemDescription);

      localStorage.setItem(
        "solutionsDescription",
        formData.solutionsDescription
      );

      localStorage.setItem("sector", formData.sector);
      localStorage.setItem("otherSector", formData.otherSector);
      localStorage.setItem("marketDescription", formData.marketDescription);
      localStorage.setItem("TAM", formData.TAM);
      localStorage.setItem("TAMGrowthRate", formData.TAMGrowthRate);
      localStorage.setItem("SAM", formData.SAM);
      localStorage.setItem("SAMGrowthRate", formData.SAMGrowthRate);

      localStorage.setItem("productOverview", formData.productOverview);
      localStorage.setItem("productRoadmap", formData.productRoadmap);
      localStorage.setItem(
        "productRoadmapDescription",
        formData.productRoadmapDescription
      );
      localStorage.setItem(
        "technicalArchitecture",
        formData.technicalArchitecture
      );

      localStorage.setItem("appType", formData.appType);
      localStorage.setItem("mobileScreenshots", formData.mobileScreenshots);
      localStorage.setItem("webScreenshots", formData.webScreenshots);

      localStorage.setItem("businessModel", formData.businessModel);

      localStorage.setItem("keyStakeholders", formData.keyStakeholders);
      localStorage.setItem("customerPersona", formData.customerPersona);
      localStorage.setItem("goToMarketStrategy", formData.goToMarketStrategy);

      localStorage.setItem("trackRecord", formData.trackRecord);

      localStorage.setItem("caseStudies", formData.caseStudies);

      localStorage.setItem("testimonials", formData.testimonials);

      localStorage.setItem("competitors", formData.competitors);

      localStorage.setItem("competitiveDiff", formData.competitiveDiff);

      localStorage.setItem("teamMembers", formData.teamMembers);

      localStorage.setItem("websiteLink", formData.websiteLink);
      localStorage.setItem("linkedinLink", formData.linkedinLink);
      localStorage.setItem("contactEmail", formData.contactEmail);
      localStorage.setItem("contactPhone", formData.contactPhone);

      localStorage.setItem("financialSnapshot", formData.financialSnapshot);
      localStorage.setItem("revenueCost", formData.revenueCost);
      localStorage.setItem("plannedRaise", formData.plannedRaise);
      localStorage.setItem("useOfFunds", formData.useOfFunds);
      localStorage.setItem("percentage", formData.percentage);
      changedData = false;
    }

    // Proceed to the next section or show success
    // message
    if (section < 17) {
      setSection((prevSection) => prevSection + 1);
      setIsLoading(false);
    } else {
      navigate("/pages/presentationcheck");
    }
    setProgress(section * 6);
  };

  const handleBack = () => {
    setSection((prevSection) => prevSection - 1);
  };

  const getSectionTitle = (section) => {
    switch (section) {
      case 1:
        return "About Company";
      case 2:
        return "Company Details";
      case 3:
        return "Problem Description";
      case 4:
        return "Solutions";
      case 5:
        return "Market and Opportunity";
      case 6:
        return "Products and Services";
      case 7:
        return "Product Screenshots";
      case 8:
        return "Business Model";
      case 9:
        return "Go-to-market Strategy";
      case 10:
        return "Track Record";
      case 11:
        return "Case Study";
      case 12:
        return "Testimonials";
      case 13:
        return "Competition";
      case 14:
        return "Competitive Differentiation";
      case 15:
        return "Team Members";
      case 16:
        return "Financial Snapshot"; // Update the case for Financials section
      case 17:
        return "Contact"; // Update the case for Contact section
      default:
        return "";
    }
  };

  return (
    <div className="native-form">
      <Navbar handleClick={handleLogoClicked} />
      <div className="form-container">
        <div className="form-details">
          <div className="section-name">
            <h1>{getSectionTitle(section)}</h1>
          </div>
          <div className="progress-bar">
            <div
              style={{
                height: "5px",
                width: "100%",
                backgroundColor: "#004264",
                borderRadius: "50px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "#e6a500",
                  borderRadius: "inherit",
                  transition: "width .2s ease-in",
                }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-area">
              {section === 1 && (
                <AboutCompany formData={formData} handleChange={handleChange} />
              )}
              {section === 2 && (
                <CoverSlide formData={formData} handleChange={handleChange} />
              )}
              {section === 3 && (
                <Problem formData={formData} handleChange={handleChange} />
              )}
              {section === 4 && (
                <Solutions formData={formData} handleChange={handleChange} />
              )}
              {section === 5 && (
                <Market formData={formData} handleChange={handleChange} />
              )}
              {section === 6 && (
                <Product formData={formData} handleChange={handleChange} />
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
              {section === 10 && (
                <Track
                  formData={formData}
                  handleChange={handleChange}
                  setFormData={setFormData} // Pass setFormData here
                  isLoading={isLoading}
                />
              )}
              {section === 11 && (
                <Case formData={formData} handleChange={handleChange} />
              )}
              {section === 12 && (
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
              {/* Render the Financials component */}
              {section === 17 && (
                <Contact formData={formData} handleChange={handleChange} />
              )}{" "}
            </div>
            {/* Render the Contact component */}
            <div className="form-buttons">
              <div className="form-back-button">
                {section !== 1 && (
                  <button type="button" onClick={handleBack}>
                    Back
                  </button>
                )}
              </div>
              <div
                className={`form-next-button ${
                  isLoading ? "form-next-button-disabled" : ""
                }`}
              >
                <button type="submit" disabled={isLoading || !isUploadComplete}>
                  {section !== 17 ? "Next" : "Submit"}
                </button>
              </div>
            </div>
          </form>
          {showHiddenButton && (
            <button onClick={handleHiddenButtonClick}>Hidden Button</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
