import { getFirestore, doc, getDoc } from "firebase/firestore";

export const fetchUserData = async (user) => {
  if (!user) return null;
  
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
