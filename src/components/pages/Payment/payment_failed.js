import React from 'react';
import './payment_failed.css';

const PaymentFailed = () => {
  return (
    <div className="payment-failed-container">
      <div className="payment-failed-message">
        Due to unavoidable situation Payment Failed.
      </div>
      <div className="payment-failed-actions">
        <a href="/presentationcheck" className="retry-link">Go to Presentationcheck page</a>
        <a href="/" className="retry-link">Retry Again</a>
      </div>
    </div>
  );
};

export default PaymentFailed;
