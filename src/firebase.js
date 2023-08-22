// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDFfiM0ojFWAgIRrTHCUictaDWDDuEKF64",
	authDomain: "react-chat-11404.firebaseapp.com",
	projectId: "react-chat-11404",
	storageBucket: "react-chat-11404.appspot.com",
	messagingSenderId: "420904262996",
	appId: "1:420904262996:web:288f2cb5f48a73cb21fcc1",
	measurementId: "G-1V628VLT6M",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const app = initializeApp(firebaseConfig);

// Export auth and provider for use in components
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default firebaseApp;
