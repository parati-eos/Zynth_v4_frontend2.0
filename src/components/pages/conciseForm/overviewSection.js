// src/components/Section.js
import React from 'react';

const OverviewSection = ({ title, name, value, handleChange }) => (
  <div className="form-section">
    <label htmlFor={name} className="section-title">{title}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder="Type your answer here..."
      required
    />
    <div className="input-line"></div>
  </div>
);

export default OverviewSection;
