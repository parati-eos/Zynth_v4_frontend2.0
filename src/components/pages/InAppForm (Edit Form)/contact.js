import React from "react";
import "react-phone-input-2/lib/bootstrap.css";// Import the CSS for the PhoneInput component
import './contact.css'
const Contact = ({ formData, handleChange }) => {
  return (
    <>
      <div className="Contact-Inapp">
        <label>Please provide the link to your website.*</label>
        <input
          type="text"
          id="websiteLink"
          name="websiteLink"
          value={formData.websiteLink}
          onChange={handleChange}
          placeholder="zynth.ai"
          required
        />
      </div>
    
      <div className="Contact-Inapp">
        <label>Please provide the link to your company Linkedin page.</label>
        <input
          type="text"
          id="linkedinLink"
          name="linkedinLink"
          value={formData.linkedinLink}
          onChange={handleChange}
          placeholder="linkedin.com/company/zynth-ai"
        />
      </div>
    
      <div className="Contact-Inapp">
        <label>Please provide the contact email address.*</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="example@paratti.in"
          required
        />
      </div>
    </>
  );
};

export default Contact;
