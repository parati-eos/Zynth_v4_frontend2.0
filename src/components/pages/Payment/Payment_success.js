import React, { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(20); // Set initial countdown to 20 seconds

  useEffect(() => {
    // Extract the formId from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('formId');

    if (!formId) {
      console.error("Form ID not found in URL");
      return;
    }

    // Function to handle download
    const handleDownload = async () => {
      try {
        const response = await fetch(
          `https://zynth.ai/api/slides/url?formId=${formId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        const url = result.PresentationURL;
    
        if (!url || typeof url !== "string") {
          throw new Error("Invalid URL in response");
        }
        // Open the URL in the current tab
        window.open(url, "_self");
      } catch (error) {
        console.error("Error exporting presentation:", error);
        alert(
          "Oops! It seems like the pitch deck presentation is missing. Click 'Generate Presentation' to begin your journey to success!"
        );
      }
    };
    
    // Function to update payment status
    const updatePaymentStatus = async () => {
      try {
        const response = await fetch('https://zynth.ai/api/appscript/updatePaymentStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ FormID: formId, paymentStatus: 1 }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Payment status updated:", result);
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };

    const callAdditionalApi = async () => {
      try {
        const response = await fetch(`https://zynth.ai/api/slides/presentation?formId=${formId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("Additional API response:", result);
    
        const presentationID = result.PresentationID; // Extract PresentationID from response
    
        if (presentationID) {
          // Call the next API with the extracted presentationID
          const secondApiResponse = await fetch(`https://script.google.com/macros/s/AKfycbyUR5SWxE4IHJ6uVr1eVTS7WhJywnbCNBs2zlJsUFbafyCsaNWiGxg7HQbyB3zx7R6z/exec?presentationID=${presentationID}`);
    
          const secondApiText = await secondApiResponse.text(); // Get raw response as text
          console.log("Raw second API response:", secondApiText); // Log raw response
    
          try {
            const secondApiResult = JSON.parse(secondApiText); // Try to parse the response
            console.log("Second API parsed response:", secondApiResult);
          } catch (jsonError) {
            console.error("Error parsing second API response as JSON:", jsonError);
          }
        } else {
          console.error("PresentationID not found in the response");
        }
      } catch (error) {
        console.error("Error calling additional APIs:", error);
      }
    };
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);  // Clear interval when countdown reaches 0
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update countdown every second

    // Call callAdditionalApi after 6 seconds
    const additionalApiTimer = setTimeout(() => {
      callAdditionalApi();
    }, 6000);

    // Call handleDownload and updatePaymentStatus after 20 seconds
    const downloadAndUpdateTimer = setTimeout(() => {
      handleDownload();
      updatePaymentStatus();
    }, 20000);

    // Clear timeouts and intervals if the component unmounts
    return () => {
      clearTimeout(additionalApiTimer);
      clearTimeout(downloadAndUpdateTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flexDirection: 'column' }}>
      <h1>Payment Successful</h1>
      <p>Your payment has been successfully processed.</p>

      {/* Spinner (loading animation) */}
      <div className="spinner" style={{ width: '50px', height: '50px', margin: '20px 0', border: '5px solid #f3f3f3', borderTop: '5px solid #3498db', borderRadius: '50%', animation: 'spin 2s linear infinite' }}></div>

      {/* Countdown timer */}
      <p>Redirecting in {countdown} seconds...</p>

      {/* Spinner keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
