import React, { useState, useEffect } from "react";
import axios from 'axios';
import uploadFileToS3 from "./uploadFileToS3"; // Import the function for uploading files to S3
import removeBackground from "./removeBackground"; // Import the background removal function
import "./About.css";

const AboutCompany = ({ formData, handleChange, handleNext }) => {
  const [logoUrl, setLogoUrl] = useState(formData.logo || null); // Initialize with formData.logo if available
  const [fileInputKey, setFileInputKey] = useState(0); // Key to reset file input

  useEffect(() => {
    // Update logoUrl if formData.logo changes
    setLogoUrl(formData.logo || null);
  }, [formData.logo]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    try {
      console.log('File selected:', file);

      // Remove the background from the logo if necessary
      const processedFile = await removeBackground(file);
      console.log('Processed file:', processedFile);

      // Upload the processed logo to S3
      const uploadedLogoUrl = await uploadFileToS3(processedFile);
      console.log('Uploaded logo URL:', uploadedLogoUrl);

      setLogoUrl(uploadedLogoUrl); // Set the URL of the uploaded logo
      handleChange({ target: { name: "logo", value: uploadedLogoUrl } }); // Update form data with the logo URL

      // Fetch colors from the API
      const colors = await fetchColorsFromApi(uploadedLogoUrl);
      if (colors) {
        handleChange({ target: { name: "primaryColor", value: colors[0] } });
        handleChange({ target: { name: "secondaryColor", value: colors[1] } });
        handleChange({ target: { name: "p50s50", value: colors[2] } });
        handleChange({ target: { name: "p75s25", value: colors[3] } });
        handleChange({ target: { name: "p25s75", value: colors[4] } });
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const fetchColorsFromApi = async (imageUrl) => {
    try {
      const response = await axios.post('https://zynth.ai/api/get-colors/', { imageUrl });
      const colors = response.data.map(color => color.hex); // Extract hex values from response
      console.log('Fetched colors:', colors);
      return colors;
    } catch (error) {
      console.error('Error fetching colors from API:', error);
      return null;
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    handleChange({ target: { name: "logo", value: null } });
    setFileInputKey((prevKey) => prevKey + 1); // Reset file input
  };

  const handleContinue = () => {
    if (logoUrl) {
      // Proceed to the next section only if the logo is uploaded
      handleNext(formData);
    } else {
      alert("Please upload the logo before continuing.");
    }
  };

  return (
    <>
      <div className="textInputQuestions">
        <label htmlFor="companyName">What is the name of your company?*</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <div className="textInputQuestions">
        <label htmlFor="tagline">What is the company's tagline?</label>
        <input
          type="text"
          id="tagline"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="textInputQuestions">
        <label htmlFor="logo">
          Please upload logo with a transparent background (JPG, JPEG, PNG)*
        </label>
        {logoUrl ? (
          <div className="text-input-logo">
            <div className="text-input-logo-filename">
              <div>{logoUrl.split("/").pop()}</div>
            </div>
            <div className="text-input-logo-remove">
              <button onClick={handleRemoveLogo}>Remove</button>
            </div>
          </div>
        ) : (
          <input
            key={fileInputKey}
            type="file"
            id="logo"
            name="logo"
            accept=".jpg,.jpeg,.png"
            onChange={handleLogoChange}
            required
          />
        )}
      </div>
      <br />
    </>
  );
};

export default AboutCompany;
