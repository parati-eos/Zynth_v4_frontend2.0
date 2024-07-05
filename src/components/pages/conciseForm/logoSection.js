// src/components/LogoSection.js
import React from "react";
import uploadimg from '../../Asset/Frame.png';


const LogoSection = ({ data, handleChange }) => (
  <div className="form-section">
    <label htmlFor="logo" className="section-title">Logo</label>
    <div className="upload">
      <label htmlFor="file" className="drop-container" id="dropcontainer">
        <img src={uploadimg} alt="Upload Icon" />
        <span className="drop-title">Choose file or Drag here</span>
        <input
          type="file"
          id="file"
          name="logo"
          onChange={handleChange}
          value={data?.name}
          required
        />
      </label>
    </div>
  </div>
);

export default LogoSection;
