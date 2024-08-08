import React, { useState } from "react";

const PaymentGateway = ({ amount, productinfo, onSuccess, formId }) => {
  const [paymentData, setPaymentData] = useState({
    amount,
    productinfo,
    firstname: "Adarsha",
    email: localStorage.getItem("userEmail") || '',
    phone: "1234567890",
    formId, // Add formId to paymentData if needed
  });

  const handlePayment = async () => {
    try {
      console.log("Sending payment data to generate PayU hash:", paymentData);

      const response = await fetch('http://localhost:5000/api/generate-payu-hash', {
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
      paymentForm.setAttribute('action', 'https://test.payu.in/_payment');
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
        <input type="hidden" name="surl" value="http://localhost:3000/payment-success?formId=${formId}" />
        <input type="hidden" name="furl" value="http://localhost:3000/payment-failure" />
        <input type="hidden" name="hash" value="${hash}" />
      `;

      console.log("Submitting payment form with data:", paymentForm.innerHTML);
      document.body.appendChild(paymentForm);
      paymentForm.submit();
    } catch (error) {
      console.error('Error generating PayU hash:', error);
      alert('SORRY!\nWe were unable to process your payment\nError Reason: ' + error.message);
    }
  };

  return (
    <button id="payment-button" onClick={handlePayment} style={{ display: 'block' }}>
      Pay and Download
    </button>
  );
};

export default PaymentGateway;
