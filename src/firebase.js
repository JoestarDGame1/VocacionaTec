import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsYfBDFNAyd7y8zz2jeHTL0PeFxj_aMKM",
  authDomain: "vocacionatec.firebaseapp.com",
  projectId: "vocacionatec",
  storageBucket: "vocacionatec.firebasestorage.app",
  messagingSenderId: "840130860728",
  appId: "1:840130860728:web:d4c037dbc2552a0486464d",
  measurementId: "G-2T7FZFLQTL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);