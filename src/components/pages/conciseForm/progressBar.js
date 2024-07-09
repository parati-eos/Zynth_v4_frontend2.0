// src/components/ProgressBar.js
import React from 'react';


const ProgressBar = ({ step, totalSteps }) => {
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
