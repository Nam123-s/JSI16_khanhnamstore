import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOrcd9E7Efk1FYFQ7O2roVyElAMZi1MDM",
  authDomain: "pnl-jsi16.firebaseapp.com",
  projectId: "pnl-jsi16",
  storageBucket: "pnl-jsi16.firebasestorage.app",
  messagingSenderId: "912897970465",
  appId: "1:912897970465:web:0a7a7b66ef57603a922e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app};