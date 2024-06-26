import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LoginImage from "../Asset/Landing Page Poster.png";
import LoginNavbar from "../shared/js/LoginNavbar.js";
import MicrosoftLogin from "react-microsoft-login";
import "./Login.css";
import MSLogin from "../Asset/ms-login.svg";

function Login() {
  const navigate = useNavigate();

  const handleLogoClicked = () => {
    navigate("/");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("userEmail", decoded.email);
    localStorage.setItem("userDP", decoded.picture);
    
    const userData = {
      name: decoded.name, // Assuming 'name' is present in the decoded JWT
      email: decoded.email
    };

    // Send user data to MongoDB via API
    saveUserData(userData);

    // Redirect to success.js upon successful login
    navigate("/applicationLanding", { state: { user: decoded } });
  };

  const handleMicrosoftSuccess = (data) => {
    console.log("Microsoft Authentication Response:", data);
    try {
      if (data && data.authResponse && data.authResponse.access_token) {
        const decoded = jwtDecode(data.authResponse.access_token);
        localStorage.setItem("userEmail", decoded.email);
        
        const userData = {
          name: decoded.name,
          email: decoded.email
        };

        // Send user data to MongoDB via API
        saveUserData(userData);

        // Redirect to success.js upon successful login
        navigate("/applicationLanding");
      } else {
        console.error(
          "Microsoft Login Failed: Invalid authentication response format"
        );
      }
    } catch (error) {
      console.error("Microsoft Login Failed:", error);
    }
  };

  const handleLoginFailure = (provider, error) => {
    console.error(`${provider} Login Failed:`, error);
  };

  const saveUserData = (userData) => {
    fetch("https://zynth.ai/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data stored:", data);
      })
      .catch((error) => {
        console.error("Error storing user data:", error);
      });
  };

  return (
    <div className="main-container">
      <LoginNavbar handleClick={handleLogoClicked} />
      <div className="login-container">
        <div className="login-image-container">
          <img src={LoginImage} alt="Login" />
        </div>
        <div className="login-details-container">
          <div className="wrapper">
            <h1>Login</h1>
            <form action="">{/* Your login form here */}</form>
            <div className="google-login">
              <GoogleOAuthProvider clientId="1053104378274-jchabnb9vv91n94l76g97aeuuqmrokt9.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={(error) => handleLoginFailure("Google", error)}
                />
              </GoogleOAuthProvider>
            </div>
            <div className="microsoft-login">
              <MicrosoftLogin
                clientId="1fe7a2de-f766-4418-b6c8-1e7be3da2b9e"
                authCallback={handleMicrosoftSuccess}
                redirectUri="http://localhost:3000" // Specify your redirect URL here
                prompt="select_account" // Specify the prompt parameter
              >
                <img src={MSLogin} alt="Microsoft Login" />
              </MicrosoftLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
