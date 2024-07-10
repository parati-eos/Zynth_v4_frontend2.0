import React from 'react';

const ContactSection = ({ title,name1, value1, name2, value2, handleChange, type = 'text' }) => (
  <div className="form-section">
    <label htmlFor={name1} className="section-title">{title}</label>
    <input
      type={type}
      id={name1}
      name={name1}
      value={value1}
      onChange={handleChange}
      placeholder="Website"
      required
    />
    <div className='input-line'></div>
    <input
      type={type}
      id={name2}
      name={name2}
      value={value2}
      onChange={handleChange}
      placeholder="LinkedIn"
      required
    />
    <div className='input-line'></div>
  </div>
);

export default ContactSection;