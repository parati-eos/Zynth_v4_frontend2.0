// Competition.js
import React, { useState } from "react";
import close from "../../Asset/close.png";
import "./Competition.css"; // Importing the CSS file

const Competition = ({ formData,handleChange }) => {
  const minCompetitorFields = 4;
  const initialCompetitors = Array.from({ length: minCompetitorFields }, () => "");
  const [competitors, setCompetitors] = useState(initialCompetitors);

  const handleCompetitorChange = (index, value) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index] = value;
    setCompetitors(updatedCompetitors);
  };

  const addCompetitorRow = () => {
    if (competitors.length < 6) {
      setCompetitors([...competitors, ""]); // Add an empty competitor
    }
  };

  const removeCompetitorRow = (index) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors.splice(index, 1); // Remove competitor at the specified index
    setCompetitors(updatedCompetitors);
  };

  formData["competitors"] = competitors;

  return (
    <div className="competition-section">
      <div className="competition-container">
        <label htmlFor="competitors">
          Who would you consider to be your company's top competitors in the market? List at least 4 of them
        </label>
        {competitors.map((competitor, index) => (
          <div key={index} className="competitor-row">
            <div className="competitor">
              <input
                type="text"
                placeholder={`Competitor ${index + 1}`}
                value={competitor}
                onChange={(e) => handleCompetitorChange(index, e.target.value)}
                required
              />
            </div>
            {competitors.length > 4 && (
              <div
                className="close-button-competition"
                type="button"
                onClick={() => removeCompetitorRow(index)}
              >
                <img src={close} alt="Close" />
              </div>
            )}
          </div>
        ))}
        {competitors.length < 6 && (
          <button
            type="button"
            onClick={addCompetitorRow}
            className="add-row-button"
          >
            Add Competitor
          </button>
        )}
      </div>
    </div>
  );
};

export default Competition;
