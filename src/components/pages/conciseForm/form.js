// src/components/ConciseForm.js
import React, { useState, useEffect } from 'react';
import Section from './Section';
import LogoSection from './logoSection';
import IndustrySection from './IndustrySection';
import OverviewSection from './overviewSection';
import Navbar from '../../shared/js/LoginNavbar';
import ProgressBar from './progressBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uploadFileToS3 from '../utils/uploadFileToS3';
import removeBackground from '../utils/removeBackground';
import CircularProgress from '@mui/material/CircularProgress';
import './form.css';
import ContactSection from './contactus';

const steps = {
  COMPANY_NAME: 1,
  LOGO: 2,
  TAGLINE: 3,
  INDUSTRY: 4,
  ABOUT_COMPANY: 5,
  PRODUCT_SERVICE: 6,
  WEBSITE: 7,
};

const generateFormId = () => {
  return 'Parati-' + Date.now();
};

const ConciseForm = () => {
  const [step, setStep] = useState(steps.COMPANY_NAME);
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userEmail'),
    companyName: '',
    tagline: '',
    logo: null,
    companyOverview: '',
    sector: '',
    otherSector: '',
    industry: '',
    otherIndustry: '',
    productOverview: '',
    websiteLink: '',
    linkedinLink: '',
    contactEmail: localStorage.getItem('userEmail'),
    contactPhone: '',
  });
  const [formId, setFormId] = useState('');
  const [generatedPresentationID, setgeneratedPresentationID] = useState(null);
  const [logoUrl, setLogoUrl] = useState(formData.logo || null);
  const [isLogoLoading, setIsLogoLoading] = useState(false);

  useEffect(() => {
    const newFormId = generateFormId();
    localStorage.setItem('submissionId', newFormId);
    setFormId(newFormId);
    console.log('Form ID:', newFormId);
    const userEmail = localStorage.getItem('userEmail');
    console.log('User Email:', userEmail);
  }, []);

  const navigate = useNavigate();
  const handleLogoClicked = () => {
    navigate('/applicationLanding');
  };

  const validateStep = () => {
    switch (step) {
      case steps.COMPANY_NAME:
        return formData.companyName.trim() !== '';
      case steps.LOGO:
        return formData.logo !== null;
      case steps.TAGLINE:
        return true;
      case steps.ABOUT_COMPANY:
        return formData.companyOverview.trim() !== '';
        case steps.INDUSTRY:
          var temp;
          
          if (formData.sector === "Other") {
              temp = formData.otherSector.trim() !== '';
          } else {
              temp = formData.sector.trim() !== '';
          }
      
          if (formData.industry === "Other") {
              temp = temp && formData.otherIndustry.trim() !== '';
          } else {
              temp = temp && formData.industry.trim() !== '';
          }
      
          return temp;
      
      case steps.PRODUCT_SERVICE:
        return formData.productOverview.trim() !== '';
      case steps.WEBSITE:
        return formData.websiteLink.trim() !== '';
      default:
        return false;
    }
  };

  const handlePrev = () => {
    if (step > steps.COMPANY_NAME) setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    setLogoUrl(formData.logo || null);
  }, [formData.logo]);

  const handleBlankSlideGeneration = async () => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxHoHV3Agvgc4GeTYez8LUocHiYlL6_D69FwSTO1lQHti37WkIt7l0buFTMfnfuQEyD3g/exec?userID=${localStorage.getItem(
          'userEmail'
        )}&submissionID=${formId}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.text();
      console.log('API Response:', responseData); // Log the entire response
      setgeneratedPresentationID(responseData);
      localStorage.setItem('generatedPresentationId', responseData);
      const data = JSON.parse(responseData);
      console.log(data + 'is here !');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    setIsLogoLoading(true);
    try {
      console.log('File selected:', file);
      const processedFile = await removeBackground(file);
      console.log('Processed file:', processedFile);

      // Upload the processed logo to S3
      const uploadedLogoUrl = await uploadFileToS3(processedFile);
      console.log('Uploaded logo URL:', uploadedLogoUrl);

      setLogoUrl(uploadedLogoUrl); // Set the URL of the uploaded logo
      handleChange({ target: { name: 'logo', value: uploadedLogoUrl } }); // Update form data with the logo URL

      // Fetch colors from the API
      const colors = await fetchColorsFromApi(uploadedLogoUrl);
      if (colors) {
        handleChange({ target: { name: 'primaryColor', value: colors[0] } });
        handleChange({ target: { name: 'secondaryColor', value: colors[1] } });
        handleChange({ target: { name: 'p50s50', value: colors[2] } });
        handleChange({ target: { name: 'p75s25', value: colors[3] } });
        handleChange({ target: { name: 'p25s75', value: colors[4] } });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setIsLogoLoading(false);
    }
  };

  const fetchColorsFromApi = async (imageUrl) => {
    try {
      const response = await axios.post('https://v4-server.onrender.com/get-colors/', { imageUrl });
      const colors = response.data.map((color) => color.hex); // Extract hex values from response
      console.log('Fetched colors:', colors);
      return colors;
    } catch (error) {
      console.error('Error fetching colors from API:', error);
      return null;
    }
  };

  const handleSubmit = async (e, section) => {
    e.preventDefault();
    const payload = {
      formId: formId,
      formResponses: formData,
      generatedPresentationId: generatedPresentationID,
      section: section,
    };
    if (validateStep()) {
      console.log('API Payload:', payload);
      try {
        const response = await fetch('https://v4-server.onrender.com/submission/short-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (step === steps.COMPANY_NAME) {
        handleBlankSlideGeneration();
      } else if (step === steps.TAGLINE) {
        handleSubmit(e, 'about');
      } else if (step === steps.ABOUT_COMPANY) {
        handleSubmit(e, 'companyDetails');
      } else if (step === steps.INDUSTRY) {
        handleSubmit(e, 'market');
      } else if (step === steps.PRODUCT_SERVICE) {
        handleSubmit(e, 'product');
      } else if (step === steps.WEBSITE) {
        handleSubmit(e, 'contactInfo');
      }
      step < 7 ? setStep(step + 1) : navigate('/pages/presentationcheck');
    } else {
      alert('Field cannot be empty');
    }
  };

  return (
    <div className="conciseform">
      <Navbar handleClick={handleLogoClicked} />
      <div className="concise-form-container">
        <ProgressBar step={step} totalSteps={Object.keys(steps).length} />
        <form onSubmit={handleSubmit}>
          {step === steps.COMPANY_NAME && (
            <Section
              title="Company Name"
              name="companyName"
              value={formData.companyName}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.LOGO && (
            <LogoSection
              name="logo"
              value={formData.logo}
              handleChange={handleLogoChange}
              isLogoLoading={isLogoLoading}
              required
            />
          )}
          {step === steps.TAGLINE && (
            <Section
              title="Company Tagline"
              name="tagline"
              value={formData.tagline}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.ABOUT_COMPANY && (
            <OverviewSection
              title="About the Company"
              name="companyOverview"
              value={formData.companyOverview}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.INDUSTRY && (
            <IndustrySection
              title="Sector and Industry"
              name="sector"
              industry={formData.industry}
              sector={formData.sector}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.PRODUCT_SERVICE && (
            <OverviewSection
              title="Products and Services"
              name="productOverview"
              value={formData.productOverview}
              handleChange={handleChange}
              required
            />
          )}
          {step === steps.WEBSITE && (
            <ContactSection 
              title="Company Links"
              name1="websiteLink"
              value1={formData.websiteLink}
              name2="linkedinLink"
              value2={formData.linkedinLink}             
              handleChange={handleChange}
              required
            />
          )}

          <div className="form-navigation">
            {isLogoLoading ? (
              <CircularProgress sx={{ color: "#eab308" }} /> 
            ) : (
              <button type="submit" onClick={handleNext} disabled={step === steps.LOGO && isLogoLoading}>
                {step === steps.WEBSITE ? 'Submit' : 'Next'}
              </button>
            )}
            {step > steps.COMPANY_NAME && (
              <button type="button" onClick={handlePrev}>
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConciseForm;
