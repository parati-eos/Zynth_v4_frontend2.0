import React, { useState, useEffect } from "react";

const PaymentGateway = ({ amount, productinfo, onSuccess, formId }) => {
  const [paymentData, setPaymentData] = useState({
    amount,
    productinfo,
    firstname: "Zynth",
    email: localStorage.getItem("userEmail") || '',
    phone: "1234567890",
    formId,
    currency: 'USD', // Default to USD
  });

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=f0e9cf876d422e');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        if (data.country === 'IN') {
          setPaymentData(prevData => ({ ...prevData, currency: 'USD' }));
        } else {
          setPaymentData(prevData => ({ ...prevData, currency: 'INR' }));
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        // Default to USD if there is an error (you can change this to INR if needed)
        setPaymentData(prevData => ({ ...prevData, currency: 'USD' }));
      }
    };

    detectCurrency();
  }, []);

  const handlePayment = async () => {
    try {
      console.log("Sending payment data to generate PayU hash:", paymentData);

      // Ensure the currency is set correctly before proceeding
      if (!paymentData.currency) {
        alert('Currency is not set. Please try again.');
        return;
      }

      const response = await fetch('https://zynth.ai/api/generate-payu-hash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { key, txnid, hash } = result;

      const paymentForm = document.createElement('form');
      paymentForm.setAttribute('action', 'https://secure.payu.in/_payment');
      paymentForm.setAttribute('method', 'POST');
      paymentForm.setAttribute('target', '_blank');

      paymentForm.innerHTML = `
        <input type="hidden" name="key" value="${key}" />
        <input type="hidden" name="txnid" value="${txnid}" />
        <input type="hidden" name="amount" value="${paymentData.amount}" />
        <input type="hidden" name="productinfo" value="${paymentData.productinfo}" />
        <input type="hidden" name="firstname" value="${paymentData.firstname}" />
        <input type="hidden" name="email" value="${paymentData.email}" />
        <input type="hidden" name="phone" value="${paymentData.phone}" />
        <input type="hidden" name="surl" value="https://zynth.ai/api/payment-success?formId=${formId}" />
        <input type="hidden" name="furl" value="https://zynth.ai/api/payment-failure" />
        <input type="hidden" name="hash" value="${hash}" />
        <input type="hidden" name="currency" value="${paymentData.currency}" />
      `;

      // console.log("Submitting payment form with data:", paymentForm.innerHTML);
      document.body.appendChild(paymentForm);
      paymentForm.submit();
      document.body.removeChild(paymentForm);
    } catch (error) {
      // console.error('Error generating PayU hash:', error);
      alert('SORRY!\nWe were unable to process your payment\nError Reason: ' + error.message);
    }
  };

  return (
    <button id="payment-button" onClick={handlePayment} style={{ display: 'none' }}>
      Pay and Download
    </button>
  );
};

export default PaymentGateway;
