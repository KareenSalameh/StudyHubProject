import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { Alert } from 'react-native';

export const fetchFullName = async (user, setFullName) => {
  try {
    if (user) {
      const firestore = getFirestore();
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullName(userData.fullName);
      }
    }
  } catch (error) {
    console.error("Error fetching user's full name:", error);
  }
};

export const handlePublish = async (
  user,
  fullName,
  description,
  estimatedStudyTime,
  studyTime,
  studyType,
  major,
  selectedDate,
  navigation
) => {
  if (!user) {
    Alert.alert('Error', 'No user is logged in');
    return;
  }
  if (!selectedDate) {
    Alert.alert('Error', 'Please select a meeting date and time');
    return;
  }
  try {
    const firestore = getFirestore();
    await addDoc(collection(firestore, 'posts'), {
      userId: user.uid,
      userName: fullName,
      description: description,
      estimatedStudyTime: estimatedStudyTime,
      studyTime: studyTime,
      studyType: studyType,
      major: major,
      meetingStartTime: selectedDate, // Include the selected date and time
      createdAt: new Date(),
    });
    Alert.alert('Success', 'Post published successfully!');
    navigation.navigate('Home');
  } catch (error) {
    Alert.alert('Error', 'Something went wrong while publishing the post');
    console.error(error);
  }
};

export const showDatePicker = (setDatePickerVisibility) => {
  setDatePickerVisibility(true);
};

export const hideDatePicker = (setDatePickerVisibility) => {
  setDatePickerVisibility(false);
};

export const handleConfirmDate = (date, setSelectedDate, hideDatePicker) => {
  setSelectedDate(date.toISOString()); // Convert date to ISO string format
  hideDatePicker();
};
