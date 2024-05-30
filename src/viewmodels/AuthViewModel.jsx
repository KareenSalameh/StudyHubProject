// viewmodels/AuthViewModel.js
import { auth, loginWithEmailAndPassword } from '../firebase'; // Ensure correct import paths
import { createUser, uploadProfileImage, saveUserDetails } from '../models/UserModel';

export const signUpUser = async (email, password, fullName, major, image) => {
  try {
    const userCredential = await createUser(email, password);
    const user = userCredential.user;
    const profileImageUrl = await uploadProfileImage(user.uid, image);
    await saveUserDetails(user.uid, fullName, email, major, profileImageUrl);
    return user;
  } catch (error) {
    throw new Error(`Error signing up: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await loginWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};
