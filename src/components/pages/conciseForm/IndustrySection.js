// src/components/IndustrySection.js
import React from 'react';

const IndustrySection = ({ title, name, value, handleChange, options }) => (
  <div className="form-section">
    <label htmlFor={name} className="section-title">{title}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      required
    >
          <option value="">Select Sector</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Construction & Design">Construction & Design</option>
          <option value="Education">Education</option>
          <option value="Energy">Energy</option>
          <option value="Finance">Finance</option>
          <option value="Government/Public Sector">
            Government/Public Sector
          </option>
          <option value="Healthcare">Healthcare</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Media and Entertainment">
            Media and Entertainment
          </option>
          <option value="Non-profit/NGO">Non-profit/NGO</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Restaurants & Food Service">
            Restaurants & Food Service
          </option>
          <option value="Retail">Retail</option>
          <option value="Technology">Technology</option>
          <option value="Tourism & Travel">Tourism & Travel</option>
          <option value="Transportation">Transportation</option>
          <option value="Others">Others</option>
    </select>
    <div className='input-line'></div>
  </div>
);

export default IndustrySection;
