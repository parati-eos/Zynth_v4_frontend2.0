// PaymentGateway.js
import React, { forwardRef } from 'react';
import axios from 'axios';

const PaymentGateway = forwardRef(({ amount, productinfo, firstname, email, phone, onSuccess }, ref) => {
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-payu-hash', {
        amount,
        productinfo,
        firstname,
        email,
        phone,
      });

      const { key, txnid, hash } = response.data;

      const form = document.createElement('form');
      form.action = 'https://secure.payu.in/_payment'; // Use the production URL for live
      form.method = 'POST';

      form.innerHTML = `
        <input type="hidden" name="key" value="${key}" />
        <input type="hidden" name="txnid" value="${txnid}" />
        <input type="hidden" name="amount" value="${amount}" />
        <input type="hidden" name="productinfo" value="${productinfo}" />
        <input type="hidden" name="firstname" value="${firstname}" />
        <input type="hidden" name="email" value="${email}" />
        <input type="hidden" name="phone" value="${phone}" />
        <input type="hidden" name="hash" value="${hash}" />
        <input type="hidden" name="surl" value="http://localhost:3000/payment-success" />
        <input type="hidden" name="furl" value="http://localhost:3000/payment-fail" />
      `;

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error generating PayU hash:', error);
    }
  };

  return (
    <div>
      <button ref={ref} onClick={handlePayment}>Pay Now</button>
    </div>
  );
});

export default PaymentGateway;
