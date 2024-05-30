import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Post from './Post';

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (user) {
          const firestore = getFirestore();
          const q = query(collection(firestore, "posts"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const firestore = getFirestore();
      await deleteDoc(doc(firestore, "posts", id));
      setUserPosts(userPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    Alert.alert("Edit Post", `Editing post with ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Posts</Text>
      <ScrollView>
        {userPosts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            userName={post.userName}
            description={post.description}
            estimatedStudyTime={post.estimatedStudyTime}
            studyTime={post.studyTime}
            studyType={post.studyType}
            major={post.major}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showActions={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MyPosts;
