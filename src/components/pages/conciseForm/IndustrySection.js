// src/components/IndustrySection.js
import React, { useState, useEffect } from 'react';

const industrySectorMap = {
  "Aeronautics Aerospace & Defence": ["Aviation", "Defence Equipment", "Drones", "Space Technology"],
  "Agriculture": ["Agri-Tech", "Animal Husbandry", "Cellular Agriculture", "Dairy Farming", "Fisheries", "Horticulture", "Organic Agriculture", "Regenerative Agriculture"],
  "Analytics": ["Big Data", "Data Science"],
  "Art & Photography": ["Art", "Handicraft", "Photography"],
  "Automotive": ["Auto & Truck Manufacturers", "Auto Vehicles, Parts & Service Retailers", "Auto, Truck & Motorcycle Parts", "Autonomous Vehicles", "Electric Vehicle (EV) Charging Infrastructure", "Electric Vehicles"],
  "Business Services": ["Accounting, Audit and Tax Services", "Advisory and Consulting", "BPO/Outsource Services", "Business Finance", "Business Intelligence", "Business Support Services", "Business Support Supplies", "Commercial Printing Services", "Corporate Social Responsibility", "Human Resources", "Facility Management", "Legal Services", "Market Research", "Printing Services", "Sales", "Talent Management"],
  "Chemicals": ["Agricultural Chemicals", "Commodity Chemicals", "Diversified Chemicals", "Industrial Chemicals", "Specialty Chemicals"],
  "Construction": ["Construction & Engineering", "Construction Supplies & Fixtures", "Homebuilding", "Housing", "Modular Construction"],
  "Design": ["Animation", "Architecture Interior Design", "Industrial Design", "Web Design"],
  "E-commerce": ["Aggregator", "Direct to Consumer", "Discovery", "Livestream Commerce", "Mobile Commerce", "Social Commerce"],
  "Education": ["Coaching", "E-learning", "Education Technology", "Skill Development", "Skills Assessment", "Training"],
  "Enterprise Software": ["Automation/Workflow Software", "Billing and Invoicing", "Business/Productivity/CRM Software", "Collaboration and Communication", "Crowdfunding", "Customer Support", "Cyber Security", "Employment Services", "Enterprise Mobility", "ERP", "HR Tech", "Legal Tech", "Payment Solutions", "Project Management", "Sales Enablement", "Supply Chain Software"],
  "Entertainment": ["Content Production", "Digital Entertainment", "Entertainment Media", "Gaming"],
  "Environment": ["Air Quality", "Environmental Consulting", "Environmental Services", "Water and Wastewater"],
  "Finance": ["Accounting", "Banking", "Capital Markets", "Cryptocurrency", "Finance Technology", "Insurance", "Investment Banking", "Investment Management", "Lending and Loans", "Payments", "Personal Finance", "Property Finance"],
  "Food & Beverages": ["Bakery", "Beverage", "Catering", "Confectionery", "Dairy", "Food Delivery", "Food Processing", "Food Retail", "Restaurant", "Vegan & Vegetarian"],
  "Healthcare": ["Biotechnology", "Diagnostics", "Health Insurance", "Healthcare Equipment", "Healthcare Facilities", "Healthcare Technology", "Medical Devices", "Pharmaceuticals", "Wellness"],
  "Hospitality": ["Accommodations", "Food Services", "Hospitality Management", "Lodging"],
  "Infrastructure": ["Airport Operations", "Civil Engineering", "Infrastructure Construction", "Logistics & Warehousing", "Marine Infrastructure", "Port Operations", "Rail Infrastructure", "Road Infrastructure", "Transport Infrastructure"],
  "Media": ["Advertising", "Content Media", "Digital Media", "Marketing", "Public Relations"],
  "Natural Resources": ["Agriculture", "Forestry", "Mining", "Oil and Gas", "Renewable Energy"],
  "Real Estate": ["Commercial Real Estate", "Property Management", "Real Estate Services", "Real Estate Technology"],
  "Renewable Energy": ["Renewable Energy Solutions", "Renewable Nuclear Energy", "Renewable Solar Energy", "Renewable Wind Energy"],
  "Retail": ["Apparel & Accessories", "AudioTech", "Baby Care", "Computer and Electronics", "Fan Merchandise", "Footwear", "Home Furnishing", "Household Appliances", "Jewellery", "Lifestyle", "Luxury Goods", "Personal Care", "Pet Products", "Smart Home", "Toys and Games", "Wearables"],
  "Robotics": ["Robotics Application", "Robotics Technology"],
  "Security Solutions": ["Home Security solutions", "Personal Security", "Public Citizen Security Solutions"],
  "Social Network": ["Social Content", "Social Media"],
  "Sports": ["E-sports", "Fantasy Sports", "Sports Promotion and Networking", "Sports Tech"],
  "Sustainable Development": ["Circular Economy", "Clean Tech", "Climate Tech", "Decarbonization", "Green Technology", "Sustainable Packaging", "Sustainable Fashion"],
  "Technology": ["AI and Machine Learning", "AR VR (Augmented + Virtual Reality)", "Bitcoin and Blockchain", "Cloud", "Computer Vision", "Internet of Things", "Nanotechnology", "Natural Language Processing"],
  "Telecommunication & Networking": ["Integrated communication services", "Network Technology Solutions", "Satellites", "Wireless"],
  "Textiles & Apparel": ["Animal Textiles", "Leather Textiles Goods", "Mineral Textiles", "Plant Textiles", "Synthetic Textiles"],
  "Transportation & Storage": ["Air", "Cab Hailing", "Marine", "Micro-Mobility", "Rail", "Road", "Passenger Transportation Services", "Traffic Management", "Transport Infrastructure"],
  "Travel & Tourism": ["Casinos and Gaming", "Cruise Lines", "Experiential Travel", "Holiday Rentals", "Hospitality", "Hotels", "Restaurants and Bars"],
  "Waste Management": ["Collection and Pickups", "Recycling", "Segregation", "Smart Waste Management", "Upcycling", "Waste to Energy"],
  "Other": []
};

const IndustrySection = ({ title, sector, industry, handleChange }) => {
  const [selectedSector, setSelectedSector] = useState(sector || '');
  const [selectedIndustry, setSelectedIndustry] = useState(industry || '');
  const [selectedOtherSector, setSelectedOtherSector] = useState('');
  const [selectedOtherIndustry, setSelectedOtherIndustry] = useState('');
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    if (selectedSector && selectedSector !== 'Other') {
      setIndustries(industrySectorMap[selectedSector] || []);
    } else {
      setIndustries([]);
    }
  }, [selectedSector]);

  const handleSectorChange = (e) => {
    const sectorValue = e.target.value;
    setSelectedSector(sectorValue);
    setSelectedIndustry('');
    handleChange({ target: { name: 'sector', value: sectorValue } });
    handleChange({ target: { name: 'industry', value: '' } });
  };

  const handleIndustryChange = (e) => {
    const industryValue = e.target.value;
    setSelectedIndustry(industryValue);
    handleChange({ target: { name: 'industry', value: industryValue } });
  };

  const handleOtherSectorChange = (e) => {
    const otherSectorValue = e.target.value;
    setSelectedSector('Other');
    setSelectedOtherSector(otherSectorValue);
    handleChange({ target: { name: 'sector', value: 'Other' } });
    handleChange({ target: { name: 'otherSector', value: otherSectorValue } });
  };

  const handleOtherIndustryChange = (e) => {
    const otherIndustryValue = e.target.value;
    setSelectedIndustry('Other');
    setSelectedOtherIndustry(otherIndustryValue);
    handleChange({ target: { name: 'industry', value: 'Other' } });
    handleChange({ target: { name: 'otherIndustry', value: otherIndustryValue } });
  };

  return (
    <div className="form-section">
      <label htmlFor="sector" className="section-title">{title}</label>
      <select
        id="sector"
        name="sector"
        value={selectedSector === 'Other' ? '' : selectedSector}
        onChange={handleSectorChange}
        required
      >
        <option value="">Select Sector</option>
        {Object.keys(industrySectorMap).map((sectorOption) => (
          <option key={sectorOption} value={sectorOption}>{sectorOption}</option>
        ))}
      </select>

      {selectedSector === 'Other' && (
        <>
          <input
            type="text"
            id="otherSector"
            name="otherSector"
            value={selectedOtherSector}
            onChange={handleOtherSectorChange}
            placeholder="Enter other sector"
            required
          />
          <input
            type="text"
            id="otherIndustry"
            name="otherIndustry"
            value={selectedOtherIndustry}
            onChange={handleOtherIndustryChange}
            placeholder="Enter other industry"
            required
          />
        </>
      )}

      {selectedSector && selectedSector !== 'Other' && (
        <>
          <div className='input-line'></div>
          <select
            id="industry"
            name="industry"
            value={selectedIndustry}
            onChange={handleIndustryChange}
            required
          >
            <option value="">Select Industry</option>
            {industries.map((industryOption) => (
              <option key={industryOption} value={industryOption}>{industryOption}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {selectedIndustry === 'Other' && (
            <input
              type="text"
              id="otherIndustry"
              name="otherIndustry"
              value={selectedOtherIndustry}
              onChange={handleOtherIndustryChange}
              placeholder="Enter other industry"
              required
            />
          )}
          <div className='input-line'></div>
        </>
      )}
    </div>
  );
};

export default IndustrySection;
