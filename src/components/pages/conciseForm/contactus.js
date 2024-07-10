import React, { useState } from 'react';

const ContactSection = ({ title, name1, value1, name2, value2, handleChange, type = 'text' }) => {
  const [websiteError, setWebsiteError] = useState('');
  const [linkedinError, setLinkedinError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === name1) {
      if (value.includes('.')) {
        setWebsiteError('');
      } else {
        setWebsiteError('Please enter a valid website');
      }
    }

    if (name === name2) {
      if (value.includes('linkedin.com')) {
        setLinkedinError('');
      } else {
        setLinkedinError('Please provide a valid LinkedIn profile link.');
      }
    }

    handleChange(e);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === name1 && value.trim().includes('@')) {
      setWebsiteError('');
    }

    if (name === name2 && value.trim().includes('linkedin.com')) {
      setLinkedinError('');
    }
  };

  return (
    <div className="form-section">
      <label htmlFor={name1} className="section-title">{title}</label>
      <input
        type={type}
        id={name1}
        name={name1}
        value={value1}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Website"
        required
      />
      {websiteError && <p className="error-message" style={{ color: 'yellow' }}>{websiteError}</p>}
      <div className='input-line'></div>
      <input
        type={type}
        id={name2}
        name={name2}
        value={value2}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="LinkedIn"
        required
      />
      {linkedinError && <p className="error-message" style={{ color: 'yellow' }}>{linkedinError}</p>}
      <div className='input-line'></div>
    </div>
  );
};

export default ContactSection;
