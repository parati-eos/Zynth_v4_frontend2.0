// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Stripe Checkout Example</title>
//     <script src="https://js.stripe.com/v3/"></script>
// </head>
// <body>
//     <h2>Stripe Checkout Payment</h2>
//     <button id="checkout-button">Checkout</button>

//     <script>
//         const stripe = Stripe('pk_test_51OS1iGKsaTt0wxtkpremB47zkVr8KWjPzsgfXU535bxDarMWSZ4LIwtEmfSTXzq4xBlEv5Vfcm6qlwVJXyNFuTUu0021RGlgCS');  // Replace with your Stripe public key

//         // Handle checkout button click
//         document.getElementById("checkout-button").addEventListener("click", async () => {
//             // Make a request to the backend to create a checkout session
//             const response = await fetch("http://localhost:4000/api/v1/payments/create-checkout-session", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     amount: 1000, // amount in smallest currency unit (e.g., cents for USD)
//                     currency: "usd", // currency code
//                 }),
//             });

//             const data = await response.json();
//             const sessionId = data.sessionId;

//             if (sessionId) {
//                 // Redirect to Stripe Checkout with the session ID
//                 stripe.redirectToCheckout({ sessionId }).then((result) => {
//                     if (result.error) {
//                         alert(result.error.message);
//                     }
//                 });
//             }
//         });
//     </script>
// </body>
// </html> -->
