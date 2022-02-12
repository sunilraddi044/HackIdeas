import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "hackideas-fe798.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "hackideas-fe798",
  storageBucket: "hackideas-fe798.appspot.com",
  messagingSenderId: "902327260014",
  appId: "1:902327260014:web:1e4161731cedd4a947e77f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
