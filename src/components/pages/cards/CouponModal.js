import React, { useState } from 'react';
import axios from 'axios'; // For making the API request

const CouponModal = ({ isOpen, onClose, applyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post('http://localhost:5000/razorpay/verify-coupon', {
        code: couponCode
      });

      // Check if the coupon is valid
      if (response.data.message === 'Coupon is valid') {
        setIsValid(true);
        const discountAmount = response.data.discountAmount; // Assuming discountAmount is in response.data
        
        // Store the coupon code in sessionStorage as organizationId
        sessionStorage.setItem('organizationId', couponCode);
        
        // Pass the couponCode and discountAmount back to the parent component
        applyCoupon(couponCode, discountAmount);
        
        // Close modal on success
        onClose();
      } else {
        setIsValid(false);
        setErrorMessage('Invalid or expired coupon. Please try again.');
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Invalid or expired coupon. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`} onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold">Enter Coupon Code</h4>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
          {isValid === false && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={onClose} // Ensure this button closes the modal
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
