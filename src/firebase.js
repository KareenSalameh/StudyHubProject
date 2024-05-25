// Import necessary functions from the modular SDK
// Import getAnalytics if you plan to use Firebase Analytics
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, getFirestore, collection, addDoc,
  doc,onSnapshot,query,where,getDoc,
} from "firebase/firestore";
import {getStorage,uploadBytes,ref as sRef,ref,getDownloadURL,
} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC9jLEcaUuevRoApExr73fKPgIypb2cjqk",
  authDomain: "studyhub-87eef.firebaseapp.com",
  projectId: "studyhub-87eef",
  storageBucket: "studyhub-87eef.appspot.com",
  messagingSenderId: "74239115122",
  appId: "1:74239115122:web:cc3d08285784a11ea3a7eb",
  measurementId:"G-X9Q958HNN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it for use in your components
const auth = getAuth(app);

// Conditionally initialize analytics
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export { auth, loginWithEmailAndPassword };
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);


