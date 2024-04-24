// Import the functions needed from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import process from 'process';

const firebaseConfig = {
  apiKey: process.env['REACT_APP_FIREBASE_API_KEY'],
  authDomain: "sabdabajikhela.firebaseapp.com",
  projectId: process.env['REACT_APP_PROJECT_ID'],
  storageBucket: "sabdabajikhela.appspot.com",
  messagingSenderId: "1007847875933",
  appId: "1:1007847875933:web:e9ad6a7debbd509aa0f4b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);