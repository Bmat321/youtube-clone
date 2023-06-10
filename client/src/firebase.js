import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDFJUWarIOdgvDj83-iXfUBQ4D3RnR4iOw",
  authDomain: "bmatadmin.firebaseapp.com",
  projectId: "bmatadmin",
  storageBucket: "bmatadmin.appspot.com",
  messagingSenderId: "58385637505",
  appId: "1:58385637505:web:90568422af3db4cfb0ed80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
