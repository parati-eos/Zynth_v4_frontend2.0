import React, { useState, useEffect } from "react";
import uploadFileToS3 from "../utils/uploadFileToS3"; // Import the function for uploading files to S3
import './Cover.css'
const Cover = ({ formData, handleChange, handleNext }) => {
  const [logoUrl, setLogoUrl] = useState(formData.logo || null); // Initialize with formData.logo if available
  const [fileInputKey, setFileInputKey] = useState(0); // Key to reset file input


  useEffect(() => {
    // Update logoUrl if formData.logo changes
    setLogoUrl(formData.logo || null);
  }, [formData.logo]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    try {
      const logoUrl = await uploadFileToS3(file); // Upload the logo file to S3
      setLogoUrl(logoUrl); // Set the URL of the uploaded logo
      handleChange({ target: { name: "logo", value: logoUrl } }); // Update form data with the logo URL
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    handleChange({ target: { name: "logo", value: null } });
    setFileInputKey((prevKey) => prevKey + 1); // Reset file input
  };

  return (
    <>
      <div className="Cover-Inapp">
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

      <div className="Cover-Inapp">
        <label htmlFor="tagline">What is the company's tagline?</label>
        <input
          type="text"
          id="tagline"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
        />
      </div>

      <div className="Cover-Inapp">
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
    </>
  );
};

export default Cover;
