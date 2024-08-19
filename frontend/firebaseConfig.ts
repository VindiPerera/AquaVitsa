// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6K-LeV2UWfnX-cOmNCjNSFkxJ9OhFaYM",
  authDomain: "aquavista-abc60.firebaseapp.com",
  projectId: "aquavista-abc60",
  storageBucket: "aquavista-abc60.appspot.com",
  messagingSenderId: "742724441160",
  appId: "1:742724441160:web:b5c2cab89eef48810ef47d",
  measurementId: "G-W13QKTHFC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Export the initialized app and analytics if needed
export { app, analytics };