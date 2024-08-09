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
          `https://v4-server.onrender.com/slides/url?formId=${formId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("Result:", result);
    
        // Check if the response is an object and contains the PresentationURL
        const url = result.PresentationURL;
        console.log("URL:", url);
    
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
        const response = await fetch('https://v4-server.onrender.com/appscript/updatePaymentStatus', {
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

    // Call handleDownload and updatePaymentStatus after 5 seconds
    const timer = setTimeout(() => {
      handleDownload();
      updatePaymentStatus();
    }, 5000);

    // Clear timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <h1>Payment Successful</h1>
      <p>Your payment has been successfully processed. You will be redirected shortly...</p>
    </div>
  );
};

export default PaymentSuccess;
