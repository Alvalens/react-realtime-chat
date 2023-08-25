/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_APP_ID,
	measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Export auth and provider for use in components
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default firebaseApp;
