import React, { useState, useEffect } from "react";
import "./historycard.css";
import { useNavigate } from "react-router-dom";
import ShareButton from "../js/Share.js";
import ExportButton from "../js/export.js";
import EditButton from "../js/edit.js";
import PaymentGateway from "../../pages/Payment/PaymentGateway.js";
import { Tooltip } from "@mui/material";

function getSheetIdFromUrl(url) {
  const match = url.match(/\/d\/(.+?)\/|\/open\?id=(.+?)(?:&|$)/);
  return match ? (match[1] || match[2]) : null;
}

const HistoryCard = ({ userID, submissionID, PPTName, Date, link }) => {
  const [editableName, setEditableName] = useState(PPTName);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  link = getSheetIdFromUrl(link);

  useEffect(() => {
    if (paymentStatus === 1) {
      handleDownload();
    }
  }, [paymentStatus]);

  const handleHistoryCardClicked = () => {
    navigate(`/Pages/presentationcheck?submissionID=${submissionID}`);
  };

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
  };

  const checkPaymentStatusAndProceed = async () => {
    // console.log("Export button clicked for submissionID:", submissionID);

    try {
      const response = await fetch(`https://zynth.ai/api/slides/url?formId=${submissionID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API response data:", data);

      if (data && data.paymentStatus === 1) {
        handleDownload();
      } else if (data && data.paymentStatus === 0) {
        // Trigger the hidden payment button
        document.getElementById('payment-button').click();
      } else {
        alert("Unable to determine payment status.");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      alert("Error checking payment status. Please try again.");
    }
  };

  const handleDownload = async () => {
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
     // 1. First, update the payment status
     const updatePaymentStatus = async () => {
      const response = await fetch('https://zynth.ai/api/appscript/updatePaymentStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ FormID: submissionID, paymentStatus: 1 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Payment status updated:", result);
    };

    // Call payment status update
    await updatePaymentStatus();

    // 2. Then, call the additional API to get presentationID
    const callAdditionalApi = async () => {
      const response = await fetch(`https://zynth.ai/api/slides/presentation?formId=${submissionID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Additional API response:", result);

      const presentationID = result.PresentationID; // Extract PresentationID from response

      if (presentationID) {
        // Call the second API with the extracted presentationID
        const secondApiResponse = await fetch(`https://script.google.com/macros/s/AKfycbyUR5SWxE4IHJ6uVr1eVTS7WhJywnbCNBs2zlJsUFbafyCsaNWiGxg7HQbyB3zx7R6z/exec?presentationID=${presentationID}`);
        const secondApiText = await secondApiResponse.text();
        console.log("Raw second API response:", secondApiText);

        try {
          const secondApiResult = JSON.parse(secondApiText);
          console.log("Second API parsed response:", secondApiResult);
        } catch (jsonError) {
          console.error("Error parsing second API response as JSON:", jsonError);
        }
      } else {
        throw new Error("PresentationID not found in the response");
      }
    };

    // Call additional API
    await callAdditionalApi();

    // 3. Finally, call the original slides URL API
    const response = await fetch(`${serverurl}/slides/url?formId=${submissionID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Result:", result);

    const url = result.PresentationURL;
    console.log("URL:", url);

    if (!url || typeof url !== "string") {
      throw new Error("Invalid URL in response");
    }
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error exporting presentation:", error);
    alert(
      "Oops! It seems like the pitch deck presentation is missing. Click 'Generate Presentation' to begin your journey to success!"
    );
  }
};


  const handleShare = () => {
    const uniqueShareableUrl = `https://zynth.ai/share?submissionId=${submissionID}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Share Presentation",
          text: "Check out this presentation",
          url: uniqueShareableUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed: ", error));
    } else if (navigator.clipboard && navigator.platform.includes("Mac")) {
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      alert("Sharing is not supported on this device/browser.");
    }
  };

  const handleSave = async () => {
    setIsEditing(false);

    const requestBody = {
      userID: userID,
      formID: submissionID,
      newColumnValue: editableName,
    };

    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/updateRow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Row updated successfully");
        alert("Row updated successfully");
      } else {
        console.error("Failed to update row");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-image" onClick={handleHistoryCardClicked}>
          <iframe
            src={`https://docs.google.com/presentation/d/${link}/embed?rm=minimal&start=true&loop=true`}
          />
        </div>
        <div className="card-content">
          <div className="card-header">
            {isEditing ? (
              <input
                type="text"
                value={editableName}
                onBlur={handleSave}
                onChange={handleNameChange}
              />
            ) : (
              <h2 onClick={() => setIsEditing(true)}>
                Name: <span>{editableName}</span>
              </h2>
            )}
          </div>
          <h2>
            Date Created: <span>{Date}</span>
          </h2>
          <div className="card-buttons">
  <Tooltip title="Edit your presentation" arrow>
    <span><EditButton onClick={handleHistoryCardClicked} /></span>
  </Tooltip>
  <Tooltip title="Share this presentation as a weblink" arrow>
    <span><ShareButton onClick={handleShare} /></span>
  </Tooltip>
  <Tooltip title="Export to Google Slides to edit" arrow>
    <span><ExportButton onClick={checkPaymentStatusAndProceed} /></span>
  </Tooltip>
  <PaymentGateway
    amount="99"
    productinfo="Presentation Export"
    onSuccess={handleDownload}
    formId={submissionID}
  />
</div>

        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
