import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css"; // Import custom modal CSS

const PaymentGateway = ({ productinfo, onSuccess, formId }) => {
  const [paymentData, setPaymentData] = useState({
    amount: 9, // Default amount for USD
    productinfo,
    firstname: "Zynth",
    email: localStorage.getItem("userEmail") || '',
    formId,
    currency: 'USD',
    contact: '+919874930397',
  });

  const [countdown, setCountdown] = useState(null); // State to hold countdown value
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=f0e9cf876d422e');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        const currency = data.country === 'IN' ? 'INR' : 'USD';
        const amount = currency === 'INR' ? 499 : 9;

        setPaymentData(prevData => ({
          ...prevData,
          currency,
          amount,
        }));
      } catch (error) {
        console.error('Error detecting location:', error);
        setPaymentData(prevData => ({ ...prevData, currency: 'USD', amount: 9 }));
      }
    };

    detectCurrency();
  }, []);

  const verifyCoupon = async (organizationId) => {
    try {
      const response = await fetch('https://zynth.ai/api/razorpay/verify-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: organizationId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Return the result of the coupon verification
    } catch (error) {
      console.error('Error verifying coupon:', error);
      return null; // Return null in case of an error
    }
  };

  const handlePayment = async () => {
    const organizationId = localStorage.getItem("organizationId"); // Fetch organization ID from local storage
    const couponResult = await verifyCoupon(organizationId); // Verify the coupon

    let finalAmount = paymentData.amount; // Start with the original amount

    if (couponResult && couponResult.message === "Coupon is valid") {
      finalAmount *= couponResult.discountAmount; // Apply the discount
    } else {
      finalAmount = paymentData.amount; // Set finalAmount to the original amount if coupon is invalid
    }
    finalAmount = Math.round(finalAmount);
    
    // Set up the order data for Razorpay Magic Checkout
    const data = {
      amount: finalAmount , // in paise.
      currency: paymentData.currency,
      receipt: "receipt#1",
      line_items_total: finalAmount , // in paise.
      line_items: [
        {
          sku: "1g234",
          variant_id: "12r34",
          other_product_codes: {
            upc: "12r34",
            ean: "123r4",
            unspsc: "123s4"
          },
          price: finalAmount , // in paise.
          offer_price: finalAmount, // in paise.
          tax_amount: 0,
          quantity: 1,
          name: "TEST",
          description: "TEST",
          weight: 1700,
          dimensions: {
            length: 1700,
            width: 1700,
            height: 1700
          },
          image_url: "url",
          product_url: "url",
          notes: {}
        }
      ]
    };

    try {
      console.log("Sending payment data to generate Razorpay order:", { amount: finalAmount, currency: paymentData.currency });

      const response = await fetch('https://zynth.ai/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the order data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { id: order_id, amount, currency } = result;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Zynth",
        description: "Purchase of presentation",
        order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          try {
            const verifyResponse = await fetch('https://zynth.ai/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                customer_name: paymentData.firstname,
                customer_email: paymentData.email,
                customer_contact: '1234567890', // Update or handle contact dynamically
                amount: finalAmount,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verifyResult = await verifyResponse.json();
            if (onSuccess) {
              onSuccess(verifyResult);
            }

            setCountdown(8); // Start 8-second countdown
            setShowModal(true); // Show the modal
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          // Uncomment and set these values if needed
          // name: paymentData.firstname,
          email: paymentData.email,
          contact: paymentData.contact, // Update or handle contact dynamically
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('SORRY!\nWe were unable to process your payment\nError Reason: ' + error.message);
    }
  };

  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setShowModal(false); // Hide the modal once the countdown ends
      console.log('Download starting...');
      // Trigger your download here if needed
    }
  }, [countdown]);

  return (
    <div>
      <button id="payment-button" onClick={handlePayment} style={{ display: 'none' }}>
        Pay and Download
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Payment successful! Your download will start in {countdown} seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;