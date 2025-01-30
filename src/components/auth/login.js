import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, OAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseConfig.js'
import { jwtDecode } from 'jwt-decode' // Corrected import statement
import LoginImage from '../Asset/Landing Page Poster.png'
import MSLogin from '../Asset/ms-login.svg' // Adjust path to your MSLogin image
import LoginNavbar from '../shared/js/LoginNavbar.js'
import './Login.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

function Login() {
  const navigate = useNavigate()
  const defaultAvatarUrl =
    'https://github.com/parati-eos/EOS_DEPLOYMENT/blob/main/download__11_-removebg-preview%20(1).png?raw=true'

  const handleLogoClicked = () => {
    navigate('/')
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    localStorage.setItem('userEmail', decoded.email)
    localStorage.setItem('userDP', decoded.picture)

    const userData = {
      name: decoded.name,
      email: decoded.email,
    }

    // Send user data to MongoDB via API
    saveUserData(userData)

    // Redirect to success.js upon successful login
    navigate('/applicationLanding', { state: { user: decoded } })
  }

  const handleLoginFailure = (provider, error) => {
    console.error(`${provider} Login Failed:`, error)
  }

  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider('microsoft.com')
    try {
      const result = await signInWithPopup(auth, provider)
      // console.log("Authentication result:", result);
      if (result && result.user) {
        const token = result.user.stsTokenManager.accessToken
        // console.log("Access token:", token);

        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoURL || defaultAvatarUrl,
        }

        // console.log("User data:", userData);
        saveUserData(userData)

        localStorage.setItem('userEmail', userData.email)
        localStorage.setItem('userDP', userData.picture)

        // Redirect to success page upon successful login
        navigate('/applicationLanding')
      } else {
        throw new Error('Microsoft Login Failed: No access token found')
      }
    } catch (error) {
      console.error('Microsoft Login Failed:', error)
      // Handle login failure
    }
  }
  const serverurl = process.env.REACT_APP_SERVER_URL

  const saveUserData = async (userData) => {
    try {
      // Fetch IP and country information
      const ipInfoResponse = await fetch(
        'https://cors-anywhere.herokuapp.com/https://ipinfo.io/json?token=f0e9cf876d422e'
      )
      const ipInfoData = await ipInfoResponse.json()
      const signupLink = localStorage.getItem('sign_up_link') || '' // Default to empty string if not found

      const userIPCountryData = {
        ...userData,
        source: '', // Initialize the source field as an empty string
        user_ipcountry: ipInfoData.country, // Country code from IPinfo response
        user_country_name: ipInfoData.country_name || '', // Country name from IPinfo response
        sign_up_link: signupLink,
      }

      // Save user data along with IP and country information
      const response = await fetch(`https://zynth.ai/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userIPCountryData }),
      })

      const data = await response.json()
      // console.log("User data stored:", data);
    } catch (error) {
      // console.error("Error storing user data:", error);
    }
  }

  return (
    <div className="main-container shadow-lg">
      <LoginNavbar handleClick={handleLogoClicked} />
      <div className="login-container flex flex-col md:flex-row justify-center items-center">
        <div className="login-image-container flex justify-center items-center">
          <img
            src="https://d28lb1f8xy1z8m.cloudfront.net/uploads/Landing+Page+Poster.png"
            alt="Login"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="login-details-container flex justify-center items-center">
          <div className="wrapper p-6 bg-transparent border-2 border-[#004264] shadow-lg text-white rounded-lg flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form action="" className="w-full flex flex-col gap-4">
              {/* Your login form here */}
            </form>
            <div className="google-login w-full flex justify-center mb-4">
              <GoogleOAuthProvider clientId="1053104378274-jchabnb9vv91n94l76g97aeuuqmrokt9.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={(error) => handleLoginFailure('Google', error)}
                />
              </GoogleOAuthProvider>
            </div>
            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex justify-center"
            >
              <img
                src={MSLogin}
                alt="Microsoft Login"
                className="rounded-lg w-[65%] h-[65%] object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
