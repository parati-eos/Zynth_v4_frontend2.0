import React, { useState } from "react";
import close from "../../Asset/close.png";
import uploadFileToS3 from "../utils/uploadFileToS3"; // Import the function for uploading files to S3
import "./team.css";

const Team = ({ formData }) => {
  // Initialize with two team members by default
  const [teamMembers, setTeamMembers] = useState([
    { name: "", title: "", experience: "", linkedin: "", photo: null, photoUrl: null },
    { name: "", title: "", experience: "", linkedin: "", photo: null, photoUrl: null }
  ]);

  // Update the formData with teamMembers
  formData["teamMembers"] = teamMembers;

  // Function to add a new team member
  const handleAddMember = () => {
    if (teamMembers.length < 6) {
      setTeamMembers([
        ...teamMembers,
        { name: "", title: "", experience: "", linkedin: "", photo: null, photoUrl: null }
      ]);
    }
  };

  // Function to remove a team member
  const handleRemoveMember = (index) => {
    if (teamMembers.length > 2) {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers.splice(index, 1);
      setTeamMembers(updatedTeamMembers);
    }
  };

  // Function to handle changes to team members
  const handleTeamMemberChange = async (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;

    if (field === "photo") {
      try {
        const photoUrl = await uploadFileToS3(value); // Upload the photo file to S3
        updatedTeamMembers[index].photoUrl = photoUrl; // Set the URL of the uploaded photo
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }

    setTeamMembers(updatedTeamMembers);
  };

  return (
    <>
      <div className="team-container">
        <label>
          Can you provide background information about the founder(s) and key
          members of your core team, including details about their education,
          expertise, and experience that contribute to the company's success?*
        </label>
        {teamMembers.map((member, index) => (
          <div key={index} className="sectionForm-team-row">
            {teamMembers.length > 2 && (
              <div
                className="close-button"
                onClick={() => handleRemoveMember(index)}
              >
                <img src={close} alt="Remove" />
              </div>
            )}
            <label>{`Team Member ${index + 1}`}</label>
            <input
              type="text"
              value={member.name}
              placeholder={`Name *`}
              onChange={(e) =>
                handleTeamMemberChange(index, "name", e.target.value)
              }
              required
            />
            <input
              type="text"
              value={member.title}
              placeholder={`Title *`}
              onChange={(e) =>
                handleTeamMemberChange(index, "title", e.target.value)
              }
              required
            />
            <input
              type="text"
              value={member.linkedin}
              placeholder={`LinkedIn`}
              onChange={(e) =>
                handleTeamMemberChange(index, "linkedin", e.target.value)
              }
            />
            <textarea
              type="text"
              value={member.experience}
              placeholder={`Experience *`}
              onChange={(e) =>
                handleTeamMemberChange(index, "experience", e.target.value)
              }
              required
            />
            <div className=".sectionForm-file-close-container">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  handleTeamMemberChange(index, "photo", e.target.files[0])
                }
                className="file-inp"
              />
{member.photoUrl && (
  <img
    src={member.photoUrl}
    alt={`Photo of ${member.name}`}
    className="w-[7vw] h-[7vw] object-cover rounded-lg"
  />
)}

            </div>
          </div>
        ))}
        {teamMembers.length < 6 && (
          <button
            className="sectionForm-add-row-button"
            type="button"
            onClick={handleAddMember}
          >
            Add Team Member
          </button>
        )}
      </div>
      <br />
    </>
  );
};

export default Team;
