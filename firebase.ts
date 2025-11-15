// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6KB1SywNuMrxRyp06BP6SWHhSytCq-OE",
    authDomain: "zaied-project1.firebaseapp.com",
    projectId: "zaied-project1",
    storageBucket: "zaied-project1.firebasestorage.app",
    messagingSenderId: "1059873672760",
    appId: "1:1059873672760:web:ea29d526b7c5ec97eba0cd",
    measurementId: "G-D9G69Z8Y2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
