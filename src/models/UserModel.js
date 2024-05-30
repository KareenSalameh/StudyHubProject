// models/UserModel.js
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from '../firebase'; // Ensure correct import paths

export const createUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const uploadProfileImage = async (userId, imageUri) => {
  if (imageUri) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile_images/${userId}.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  }
  return null;
};

export const saveUserDetails = async (userId, fullName, email, major, profileImageUrl) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    fullName,
    email,
    major,
    profileImageUrl,
  });
};
