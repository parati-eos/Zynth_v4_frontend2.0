import React from "react";

const Product = ({ formData, handleChange }) => {
  return (
    <>
      <div className="textInputQuestions">
        <label htmlFor="productOverview">
          Can you provide an overview of the products and services your company
          offers?*
        </label>
        <textarea style={{ height: "250px" }}
          id="productOverview"
          name="productOverview"
          value={formData.productOverview}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      {/* <div className="textInputQuestions">
        <label htmlFor="productRoadmapDescription">
          Do you have a product roadmap in place? If yes, please describe your
          product roadmap.
        </label>
        <textarea
          id="productRoadmapDescription"
          name="productRoadmapDescription"
          value={formData.productRoadmapDescription}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="textInputQuestions">
        <label htmlFor="technicalArchitecture">
          Can you provide a high-level overview of the technical architecture of
          your product or service?
        </label>
        <textarea
          id="technicalArchitecture"
          name="technicalArchitecture"
          value={formData.technicalArchitecture}
          onChange={handleChange}
        />
      </div> */}
    </>
  );
};

export default Product;
