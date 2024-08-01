import React, { useState } from "react";
import './trackRecord.css'

const TrackRecord = ({ formData }) => {
  const [phaseRows, setPhaseRows] = useState([
    { year1: "", year2: "", TR: "" },
    { year1: "", year2: "", TR: "" },
    { year1: "", year2: "", TR: "" },
  ]);

  formData["trackRecord"] = phaseRows;

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = ["Select Year"];
    for (let i = currentYear - 15; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };

  const handlePhaseRowsChange = (index, field, value) => {
    const updatedPhaseRows = [...phaseRows];
    updatedPhaseRows[index][field] = value;
    setPhaseRows(updatedPhaseRows);
  };

  const isPhaseValid = (phase) => {
    return phase.year1 !== "" && phase.year2 !== "";
  };

  return (
    <div className="trackRecord-container">
      <label htmlFor="productOverview">
        Can you provide company's track record in terms of traction across
        different phases and their timeline? *
      </label>
      {phaseRows.map((row, index) => (
        <div key={index} className="trackRecord-details">
          <label htmlFor={`phase${index + 1}`}>{`Phase ${index + 1}`}</label>
          <div className="trackRecord-to-from">
            <label htmlFor={`phase${index + 1}UpperBound`}>From</label>
            <select
              id={`year1_${index}`}
              name={`year1_${index}`}
              value={row.year1}
              required
              onChange={(e) =>
                handlePhaseRowsChange(index, "year1", e.target.value)
              }
            >
              {generateYears().map((year, idx) => (
                <option key={idx} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label htmlFor={`phase${index + 1}LowerBound`}>To</label>
            <select
              id={`year2_${index}`}
              name={`year2_${index}`}
              value={row.year2}
              required
              onChange={(e) =>
                handlePhaseRowsChange(index, "year2", e.target.value)
              }
            >
              {generateYears().map((year, idx) => (
                <option key={idx} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`phase${index + 1}Timeline`}>Track Record</label>
            <textarea
              id={`TR_${index}`}
              name={`TR_${index}`}
              value={row.TR}
              required
              placeholder="Track Record Here..."
              onChange={(e) =>
                handlePhaseRowsChange(index, "TR", e.target.value)
              }
              disabled={!isPhaseValid(row)} // Disable textarea if phase years are not selected
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackRecord;
