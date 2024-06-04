import { getFirestore, doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const handleUpdate = async (user, name, email, major, bio, profileImageUrl) => {
  if (!user) return;
  
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", user.uid);
    await updateDoc(userDocRef, {
      fullName: name,
      email: email,
      major: major,
      bio: bio,
      profileImageUrl: profileImageUrl,
    });
    return "Profile updated successfully!";
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const handlePickImage = async (user, setProfileImageUrl) => {
  const result = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
  if (result.assets && result.assets.length > 0) {
    try {
      const selectedImage = result.assets[0];
      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();
      const fileName = selectedImage.uri.split('/').pop();
      const storageRef = ref(storage, `profile_images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Error uploading image:', error);
            alert('Failed to upload Image, Try again');
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            setProfileImageUrl(downloadURL);
            await saveUserDetails(user.uid, downloadURL); 
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to upload Image, Try again');
      throw error;
    }
  }
};

export const handleDeleteImage = async (user) => {
  if (!user) return;

  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", user.uid);
    await updateDoc(userDocRef, {
      profileImageUrl: null,
    });
    return "Profile image deleted successfully!";
  } catch (error) {
    console.error("Error deleting profile image:", error);
    throw error;
  }
};
