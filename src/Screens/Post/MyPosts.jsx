import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from '@react-navigation/native';
import Post from './Post';
import BottomNavBar from '../BottomNavBar';

const MyPosts = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const fetchUserPosts = useCallback(async () => {
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
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserPosts();
    }, [fetchUserPosts])
  );

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleDelete(id)
        }
      ],
      { cancelable: true }
    );
  };

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
    navigation.navigate('EditPost', { postId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("../../assets/pics/topVector.png")}
          style={styles.topImage}
        />
        <Text style={styles.headerTitle}>Study</Text>
        <Text style={styles.headerTitle2}>Hub</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>My Posts</Text>
        <View style={styles.postContainer}>
        {userPosts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            fullName={post.fullName}
            description={post.description}
            meetingStartTime={post.meetingStartTime}
            estimatedStudyTime={post.estimatedStudyTime}
            studyTime={post.studyTime}
            studyType={post.studyType}
            major={post.major}
            onDelete={() => confirmDelete(post.id)}
            onEdit={handleEdit}
            showActions={true}
            showActions2 ={false}
          />
        ))}
        </View>
      </ScrollView>
      <View style={styles.bottomImageContainer}>
        <Image source={require("../../assets/pics/topVector.png")} style={styles.topImage2} />
        <BottomNavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  topImage: {
    width: "100%",
    height: 160,
  },
  headerTitle: {
    position: 'absolute',
    top: 50,
    fontSize: 32,
    left: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitle2: {
    position: 'absolute',
    top: 80,
    fontSize: 32,
    left: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -10,
  },
  postContainer: {
    width: "120%",
  },
  bottomImageContainer: {
    alignItems: 'center',
    height: 90,
    transform: [{ rotate: '180deg' }]
  },
  topImage2: {
    width: "190%",
    height: 160,
    bottom: 20,
    right: 100,
  },
});

export default MyPosts;