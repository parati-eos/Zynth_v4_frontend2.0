import React, { useState, useEffect } from "react";
import uploadFileToS3 from "../utils/uploadFileToS3";
import './Cover.css'

const Cover = ({ formData, handleChange, setIsUploading }) => {
  const [logoUrl, setLogoUrl] = useState(formData.logo || null);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    setLogoUrl(formData.logo || null);
  }, [formData.logo]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true); // Set uploading state to true before starting the upload
    try {
      const logoUrl = await uploadFileToS3(file);
      setLogoUrl(logoUrl);
      handleChange({ target: { name: "logo", value: logoUrl } });
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setIsUploading(false); // Set uploading state to false after upload completes
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    handleChange({ target: { name: "logo", value: null } });
    setFileInputKey((prevKey) => prevKey + 1);
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
