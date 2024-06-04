import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Alert } from 'react-native';

export const fetchPost = async (postId, setPost, setDescription, setEstimatedStudyTime, setMajor, setStudyTime, setStudyType) => {
  try {
    const firestore = getFirestore();
    const postDoc = await getDoc(doc(firestore, "posts", postId));
    if (postDoc.exists()) {
      const postData = postDoc.data();
      setPost(postData);
      setDescription(postData.description);
      setEstimatedStudyTime(postData.estimatedStudyTime);
      setMajor(postData.major);
      setStudyTime(postData.studyTime);
      setStudyType(postData.studyType);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

export const handleUpdate = async (postId, description, estimatedStudyTime, major, studyTime, studyType, navigation) => {
  try {
    const firestore = getFirestore();
    await updateDoc(doc(firestore, "posts", postId), {
      description,
      estimatedStudyTime,
      major,
      studyTime,
      studyType
    });
    Alert.alert('Success', 'Post updated successfully!');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Error', 'Something went wrong while updating the post');
    console.error("Error updating post:", error);
  }
};