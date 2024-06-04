import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { uploadImage } from './PhotoUpload';

export const handleSignUp = async (fullName, email, password, major, image, setUploading, navigation) => {
  if (!fullName || !email || !password || !major) {
    alert("Please fill in all fields before signing up");
    return;
  }

  try {
    let profileImageUrl = null;

    if (image) {
      profileImageUrl = await uploadImage(image, setUploading);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveUserDetails(user.uid, fullName, email, major, profileImageUrl);
    console.log("UserDetails:", user);

    navigation.navigate("Login");
  } catch (error) {
    console.log("Error signing up:", error);
    alert("An error occurred while signing up. Please try again.");
  }
};

export const saveUserDetails = async (userId, fullName, email, major, profileImageUrl) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    fullName: fullName,
    email: email,
    major: major,
    profileImageUrl: profileImageUrl || null,
  });
  console.log("User data saved successfully!");
};
