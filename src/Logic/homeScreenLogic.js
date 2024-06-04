import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { Alert } from 'react-native';

export const fetchPosts = async (filterCriteria, setPosts) => {
  try {
    const firestore = getFirestore();
    let filteredQuery = collection(firestore, 'posts');

    if (filterCriteria.studyTime) {
      filteredQuery = query(filteredQuery, where("studyTime", "==", filterCriteria.studyTime));
    }
    if (filterCriteria.studyType) {
      filteredQuery = query(filteredQuery, where("studyType", "==", filterCriteria.studyType));
    }

    const querySnapshot = await getDocs(filteredQuery);
    const postsArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      profileImageUrl: doc.data().profileImageUrl,
      ...doc.data()
    }));
    setPosts(postsArray);
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
};

export const toggleFilterModal = (isFilterModalVisible, setFilterModalVisible) => {
  setFilterModalVisible(!isFilterModalVisible);
};

export const resetFilter = (setFilterCriteria) => {
  setFilterCriteria({
    studyTime: null,
    studyType: null,
  });
};

export const applyFilter = (setFilterModalVisible, fetchPosts) => {
  setFilterModalVisible(false);
  fetchPosts();
};
