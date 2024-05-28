// Import necessary functions from the modular SDK
// Import getAnalytics if you plan to use Firebase Analytics
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  getFirestore,} from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const storage = getStorage(app);

//const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
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
/**
 * 
 * export const getAllPosts = async () => {
  try {
    const postsCollection = collection(FIRESTORE_DB, "Posts"); // the database name and collection name as parameters
    const resultDocs = await getDocs(postsCollection);
    const result = resultDocs.docs.map((doc) => doc.data());
    return result;
  } catch (error) {
    console.error("getAllPosts Error" + error);
  }
};

export const getPostsByEmail = async (email) => {
  try {
    // console.log("Firebase - the email is :", email);
    const postsCollection = collection(FIRESTORE_DB, "Posts");
    const q = query(postsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data());
    // console.log("Firebase - getPostsByEmail result:", result);
    return result;
  } catch (error) {
    console.error("getPostsByEmail Error" + error);
  }
};

export const submitNewPost = async (email, caption, image) => {
  console.log("Firebase - in sumbitnewpost the image is", image);
  try {
    const storage = getStorage();
    const imagesurl = sRef(storage, "/posts-images/" + Date.now());
    const response = await fetch(image);
    const blob = await response.blob();
    const bytesref = await uploadBytes(imagesurl, blob);
    const downloadURL = await getDownloadURL(bytesref.ref);

    const newPost = {
      email: email,
      title: caption,
      imageURL: downloadURL,
      createdAt: new Date().toISOString(), // save the time in ISO format
      // time: Date.now(),
    };

    const postsCollection = collection(FIRESTORE_DB, "Posts");
    await addDoc(postsCollection, newPost);
  } catch (error) {
    console.error("submitNewPost Error" + error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const usersCollection = collection(FIRESTORE_DB, "users");
    const resultDocs = await getDocs(usersCollection);
    const result = resultDocs.docs
      .map((doc) => doc.data())
      .find((user) => user.email.toLowerCase() == email.toLowerCase());
    return result;
  } catch (error) {
    console.error("getUserByEmail Error" + error);
  }
};

export const getEmailByUsername = async (username) => {
  try {
    // console.log("Firebase - getEmailByUser is :", username);
    const usersCollection = collection(FIRESTORE_DB, "users");
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      // console.log("Firebase - getEmailByUser the email is :", user.email);
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    console.error("getEmailByUsername Error", error);
    return null;
  }
};

export const getCurrentUserProfileImage = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  // console.log("firebase - getpropic - the user is: ", user);
  if (user) {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(
          "firebase - getcurrentprofile - the userdata is :",
          userData
        );
        const profileImageUrl = userData.profileImageUrl;
        console.log("firebase - the profileImageUrl is:", profileImageUrl);
        return profileImageUrl;
      } else {
        console.log("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error getting user document:", error);
      return null;
    }
  } else {
    console.log("No user is currently signed in");
    return null;
  }
};

export const getCurrentUserUsername = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const firestore = getFirestore();
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(
        userDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            resolve(userData.username);
          } else {
            console.log("User data not found");
            resolve(null);
          }
        },
        (error) => {
          console.error("Error getting user data:", error);
          reject(error);
        }
      );

      // Return the unsubscribe function
      return unsubscribe;
    } else {
      console.log("No user is currently signed in");
      resolve(null);
    }
  });
};

export const updateProfileImage = async (userId, imageUri) => {
  try {
    const storage = getStorage();
    const imageRef = sRef(storage, `/profile-images/${userId}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      profileImageUrl: downloadURL,
    });

    return downloadURL;
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error;
  }
};

export const updateUsername = async (userId, newUsername) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);

    console.log("Firebase - updateuser - the userdoc is :", userDoc);
    if (userDoc.exists()) {
      // Check if the new username is already taken
      const usersCollection = collection(firestore, "users");
      const q = query(usersCollection, where("username", "==", newUsername));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Username is available, update the user document
        await updateDoc(userDocRef, {
          username: newUsername,
        });
        return true;
      } else {
        // Username is already taken
        return false;
      }
    } else {
      console.log("User document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};
*/

export { auth, loginWithEmailAndPassword };
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);


