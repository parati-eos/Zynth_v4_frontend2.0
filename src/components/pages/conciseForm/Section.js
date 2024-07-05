// src/components/Section.js
import React from 'react';

const Section = ({ title, name, value, handleChange, type = 'text' }) => (
  <div className="form-section">
    <label htmlFor={name} className="section-title">{title}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder="Type your answer here..."
      required
    />
    <div className='input-line'></div>
  </div>
);

export default Section;
