import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyC9jLEcaUuevRoApExr73fKPgIypb2cjqk",
  authDomain: "studyhub-87eef.firebaseapp.com",
  projectId: "studyhub-87eef",
  storageBucket: "studyhub-87eef.appspot.com",
  messagingSenderId: "74239115122",
  appId: "1:74239115122:web:cc3d08285784a11ea3a7eb",
  measurementId:"G-X9Q958HNN2"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = auth;
export const FIRESTORE_DB = getFirestore(app);
export const STORAGE = getStorage(app);

// Export signInWithEmailAndPassword function
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

