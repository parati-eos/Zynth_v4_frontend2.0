import React, { useEffect } from 'react';

const PaymentSuccess = () => {
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
    
        // Open the URL in a new tab
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

    // Function to call the additional API and then another API with the presentationID
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
          const secondApiResponse = await fetch(`https://script.google.com/macros/s/AKfycbzdIX00oV8voGYLhNEu8Atc9gYaQWlGQCbmBEKRFfxIUF1uhVIMMaZE-UCi4byRzA2c/exec?presentationID=${presentationID}`);
          if (!secondApiResponse.ok) {
            throw new Error(`HTTP error! status: ${secondApiResponse.status}`);
          }
          
          const secondApiResult = await secondApiResponse.json();
          console.log("Second API response:", secondApiResult);
        } else {
          console.error("PresentationID not found in the response");
        }
      } catch (error) {
        console.error("Error calling additional APIs:", error);
      }
    };

    // Call callAdditionalApi after 2 seconds
    const additionalApiTimer = setTimeout(() => {
      callAdditionalApi();
    }, 2000);

    // Call handleDownload and updatePaymentStatus after 5 seconds
    const downloadAndUpdateTimer = setTimeout(() => {
      handleDownload();
      updatePaymentStatus();
    }, 8000);

    // Clear timeouts if the component unmounts
    return () => {
      clearTimeout(additionalApiTimer);
      clearTimeout(downloadAndUpdateTimer);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <h1>Payment Successful</h1>
      <p>Your payment has been successfully processed. You will be redirected shortly...</p>
    </div>
  );
};

export default PaymentSuccess;
