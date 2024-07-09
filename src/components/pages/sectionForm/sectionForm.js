import Financials from './financial';
import './sectionForm.css'
import Team from './team';
import Testimonials from './testimonials';
import TrackRecord from './trackRecord'
import { useState } from 'react';

function SectionForm({Title,onClose}){
    const [formData, setFormData] = useState({
        userId: 'userEmail',
        companyName: "",
        tagline: "",
        logo: null,
        primaryColor: "#000000",
        secondaryColor: "#000000",
        establishmentYear: "",
        companyOverview: "",
        problemDescription: "",
        solutionsDescription: "",
        sector: "",
        otherSector: "",
        marketDescription: "",
        TAM: "",
        TAMGrowthRate: "",
        SAM: "",
        SAMGrowthRate: "",
        productOverview: "",
        productRoadmap: "",
        productRoadmapDescription: "",
        technicalArchitecture: "",
        appType: "",
        mobileScreenshots: [],
        webScreenshots: [],
        businessModel: "",
        keyStakeholders: "",
        customerPersona: "",
        goToMarketStrategy: "",
        trackRecord: [],
        caseStudies: "",
        testimonials: [],
        competitors: [],
        competitiveDiff: "",
        teamMembers: [],
        // Add contact information fields
        websiteLink: "",
        linkedinLink: "",
        contactEmail: "",
        contactPhone: "",
        // Add financial information fields
        financialSnapshot: "",
        revenueCost: [],
        plannedRaise: "",
        useOfFunds: [],
        percentage: "",
      });


    return(
        <div className="sectionForm-Container">
            <h2>{Title}</h2>
            <div className="sectionForm-Content h-[60vh] w-[70vh] bg-white">
    {
        (() => {
            if (Title === 'Track Record') {
                return <TrackRecord formData={formData}/>;
            } else if (Title === 'Founding Team') {
                return (
                        <Team formData={formData}/>
                );
            }  else if (Title === 'Financial Overview') {
                return (
                    <Financials formData={formData}/>
                );
            }
            else if(Title==='Testimonials'){
                return(
                    <Testimonials formData={formData} handleChange={() => {}}/>
                )
            }
        })()
    }
</div>
            <div className="section-form-buttons">
                <button className="" onClick={onClose}>
                    Close
                </button>
                <button className="">
                    Submit
                </button>

            </div>

        </div>
    )

}

export default SectionForm