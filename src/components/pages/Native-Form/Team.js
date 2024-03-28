import React, { useState } from "react";
import close from "../../Asset/close.png";

const Team = ({ formData, handleChange }) => {
  const [teamMembers, setTeamMembers] = useState([
    { name: "", title: "", experience: "", linkedin: "", photo: null },
    { name: "", title: "", experience: "", linkedin: "", photo: null },
  ]);

  const handleAddMember = () => {
    if (teamMembers.length < 6) {
      setTeamMembers([
        ...teamMembers,
        { name: "", title: "", experience: "", linkedin: "", photo: null },
      ]);
    }
  };

  const handleRemoveMember = (index) => {
    if (teamMembers.length > 2) {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers.splice(index, 1);
      setTeamMembers(updatedTeamMembers);
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  return (
    <>
      <br />
      <label>
        Can you provide background information about the founder(s) and key
        members of your core team, including details about their education,
        expertise, and experience that contribute to the company's success?*
      </label>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-row ">
          <input
            type="text"
            value={member.name}
            placeholder={`Name ${index + 1}`}
            onChange={(e) =>
              handleTeamMemberChange(index, "name", e.target.value)
            }
          />
          <input
            type="text"
            value={member.title}
            placeholder={`Title ${index + 1}`}
            onChange={(e) =>
              handleTeamMemberChange(index, "title", e.target.value)
            }
          />
          <input
            type="text"
            value={member.linkedin}
            placeholder={`LinkedIn ${index + 1}`}
            onChange={(e) =>
              handleTeamMemberChange(index, "linkedin", e.target.value)
            }
          />
          {teamMembers.length > 2 && (
            <div
              className="close-button"
              type="button"
              onClick={() => handleRemoveMember(index)}
            >
              <img src={close}></img>
            </div>
          )}
          <textarea
            value={member.experience}
            placeholder={`Experience ${index + 1}`}
            onChange={(e) =>
              handleTeamMemberChange(index, "experience", e.target.value)
            }
          />
          <div className="file-close-container">
            <div>
              <input
                type="file"
                accept="image/*, application/pdf"
                onChange={(e) =>
                  handleTeamMemberChange(index, "photo", e.target.files[0])
                }
              />
            </div>
          </div>
          <br />
        </div>
      ))}
      {teamMembers.length < 6 && (
        <button
          className="add-row-button"
          type="button"
          onClick={handleAddMember}
        >
          Add Team Member
        </button>
      )}
      <br />
    </>
  );
};

export default Team;