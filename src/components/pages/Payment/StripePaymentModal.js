// StripePaymentModal.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51Oh29XSEK34otd7bl9IN46obMsaHfIHPbccDICGr2TBuzyl4ATEH2fGm05sfCE9Z25YjXppuqOq06yk1YwKTa7TT00J5wthnsY');

const StripePaymentModal = ({ onPaymentSuccess, onClose }) => {
  return (
    <div className="stripe-modal">
      <div className="stripe-modal-content">
        <Elements stripe={stripePromise}>
          <PaymentForm onPaymentSuccess={onPaymentSuccess} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default StripePaymentModal;
