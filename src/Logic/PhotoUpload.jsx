import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const handlePickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
  if (result.assets && result.assets.length > 0) {
    const selectedImage = result.assets[0];
    return selectedImage.uri;
  }
  return null;
};

export const uploadImage = async (uri, setUploading) => {
  setUploading(true);
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = uri.split('/').pop();
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
          setUploading(false);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          setUploading(false);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    setUploading(false);
    throw error;
  }
};
