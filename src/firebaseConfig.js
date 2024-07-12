// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAajC4HNS0FRIHxFseEHzBndtrlRjxcySI",
    authDomain: "zynthai-de692.firebaseapp.com",
    projectId: "zynthai-de692",
    storageBucket: "zynthai-de692.appspot.com",
    messagingSenderId: "382196870030",
    appId: "1:382196870030:web:7f8a2ce7958ba4007752df",
    measurementId: "G-LHFEB6DP8K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
