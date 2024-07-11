import React, { useState } from "react";
import "./financial.css";

const Financials = ({ formData }) => {
  const [financialsData, setFinancialsData] = useState({
    financialSnapshot: "",
    plannedRaise: "",
    revenueCost: [{ year: "", revenue: "", cost: "" }],
    useOfFunds: [
      { use: "Product and Development", percentage: "" },
      { use: "Marketing and Sales", percentage: "" },
      { use: "Business Operation", percentage: "" },
      { use: "Capex", percentage: "" },
      { use: "Team Salaries", percentage: "" },
    ],
  });

  // Sync with formData
  formData["financialSnapshot"] = financialsData.financialSnapshot;
  formData["plannedRaise"] = financialsData.plannedRaise;
  formData["revenueCost"] = financialsData.revenueCost;
  formData["useOfFunds"] = financialsData.useOfFunds;

  const handleRevenueCostChange = (index, field, value) => {
    const updatedRevenueCost = [...financialsData.revenueCost];
    updatedRevenueCost[index][field] = value;

    // Enable cost input only if revenue is filled
    if (field === "revenue") {
      updatedRevenueCost[index]["cost"] = ""; // Reset cost if revenue changes
    }

    // Validate mandatory year if revenue is filled
    if (field === "revenue" && value && !updatedRevenueCost[index]["year"]) {
      updatedRevenueCost[index]["year"] = new Date().getFullYear().toString(); // Set current year as default
    }

    setFinancialsData({ ...financialsData, revenueCost: updatedRevenueCost });
  };

  const handleUseOfFundsChange = (index, field, value) => {
    const updatedUseOfFunds = [...financialsData.useOfFunds];
    updatedUseOfFunds[index][field] = value;
    setFinancialsData({ ...financialsData, useOfFunds: updatedUseOfFunds });
  };

  const addRevenueRow = () => {
    if (financialsData.revenueCost.length < 11) {
      const newRevenueCost = [
        ...financialsData.revenueCost,
        { year: "", revenue: "", cost: "" },
      ];
      setFinancialsData({ ...financialsData, revenueCost: newRevenueCost });
    } else {
      alert("You have reached the maximum number of rows.");
    }
  };

  const removeRevenueRow = (index) => {
    if (financialsData.revenueCost.length > 1) {
      const newRevenueCost = [...financialsData.revenueCost];
      newRevenueCost.splice(index, 1);
      setFinancialsData({ ...financialsData, revenueCost: newRevenueCost });
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 10 },
    (_, index) => currentYear - 5 + index
  );

  return (
    <div className="sectionForm-financial">
      <div className="sectionForm-financial-container">
        <label htmlFor="financialSnapshot">
          Please provide a financial snapshot of the company.*
        </label>
        <textarea
          id="financialSnapshot"
          name="financialSnapshot"
          rows="4"
          value={financialsData.financialSnapshot}
          placeholder="Financial Snapshot here..."
          onChange={(e) =>
            setFinancialsData({
              ...financialsData,
              financialSnapshot: e.target.value,
            })
          }
          required
        ></textarea>
      </div>
      <div className="sectionForm-financial-container">
        <label>
          Please provide revenue/revenue projections for the following years.
          Please enter the numbers in millions USD.
        </label>
        <table className="sectionForm-table-contents">
          <thead>
            <tr>
              <th>Years</th>
              <th>Revenue Projections</th>
              <th>Cost Projections</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {financialsData.revenueCost.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    name="year"
                    value={row.year}
                    onChange={(e) =>
                      handleRevenueCostChange(index, "year", e.target.value)
                    }
                    required={!!row.revenue} // Make year mandatory if revenue is filled
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="revenue"
                    value={row.revenue}
                    onChange={(e) =>
                      handleRevenueCostChange(index, "revenue", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="cost"
                    value={row.cost}
                    onChange={(e) =>
                      handleRevenueCostChange(index, "cost", e.target.value)
                    }
                    disabled={!row.revenue} // Disable if Revenue is empty
                  />
                </td>
                <td>
                  {index === financialsData.revenueCost.length - 1 ? (
                    <button onClick={addRevenueRow} className="add-bg-button">
                      Add Row
                    </button>
                  ) : (
                    <button
                      onClick={() => removeRevenueRow(index)}
                      className="yellow-bg-button"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sectionForm-financial-container">
        <label htmlFor="plannedRaise">
          How much money do you plan to raise? Please enter the number in
          millions USD.*
        </label>
        <input
          type="number"
          id="plannedRaise"
          name="plannedRaise"
          value={financialsData.plannedRaise}
          onChange={(e) =>
            setFinancialsData({
              ...financialsData,
              plannedRaise: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="sectionForm-financial-container">
        <label>Breakdown in percentages for the use of funds:</label>
        <table className="sectionForm-table-contents-useoffunds">
          <thead>
            <tr>
              <th>Use</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {financialsData.useOfFunds.map((use, index) => (
              <tr key={index}>
                <td>{use.use}</td>
                <td>
                  <input
                    type="number"
                    name="percentage"
                    value={use.percentage}
                    onChange={(e) =>
                      handleUseOfFundsChange(index, "percentage", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;
