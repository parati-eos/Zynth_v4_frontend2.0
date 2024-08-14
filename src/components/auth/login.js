import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import LoginImage from "../Asset/Landing Page Poster.png";
import MSLogin from "../Asset/ms-login.svg"; // Adjust path to your MSLogin image
import LoginNavbar from "../shared/js/LoginNavbar.js";
import "./Login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const defaultAvatarUrl = "https://github.com/parati-eos/EOS_DEPLOYMENT/blob/main/download__11_-removebg-preview%20(1).png?raw=true";

  const handleLogoClicked = () => {
    navigate("/");
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("userEmail", decoded.email);
    localStorage.setItem("userDP", decoded.picture);

    const userData = {
      name: decoded.name,
      email: decoded.email,
    };

    // Send user data to MongoDB via API
    saveUserData(userData);

    // Redirect to success.js upon successful login
    navigate("/applicationLanding", { state: { user: decoded } });
  };

  const handleLoginFailure = (provider, error) => {
    console.error(`${provider} Login Failed:`, error);
  };

  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider("microsoft.com");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Authentication result:", result);
      if (result && result.user) {
        const token = result.user.stsTokenManager.accessToken;
        console.log("Access token:", token);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoURL || defaultAvatarUrl,
        };

        console.log("User data:", userData);
        saveUserData(userData);

        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userDP", userData.picture);

        // Redirect to success page upon successful login
        navigate("/applicationLanding");
      } else {
        throw new Error("Microsoft Login Failed: No access token found");
      }
    } catch (error) {
      console.error("Microsoft Login Failed:", error);
      // Handle login failure
    }
  };
  const serverurl = process.env.REACT_APP_SERVER_URL;

const saveUserData = (userData) => {
  fetch(`${serverurl}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        ...userData,
        source: ""  // Initialize the source field as an empty string
      },
    }),
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
            <button onClick={handleMicrosoftLogin}>
              <img src={MSLogin} alt="Microsoft Login" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
