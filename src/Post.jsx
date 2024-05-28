import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Post = ({ userName, description, estimatedStudyTime, studyTime, studyType, major }) => {
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{userName}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.postDescription}>{description}</Text>
      </View>
      <Text style={styles.postDetails}>Estimated Study Time: {estimatedStudyTime} hours</Text>
      <Text style={styles.postDetails}>Study Time: {studyTime}</Text>
      <Text style={styles.postDetails}>Study Type: {studyType}</Text>
      <Text style={styles.postDetails}>Major: {major}</Text>
      <View style={styles.buttonContainer}>
      <Button title="Join" onPress={() => {/* Handle Join Press */}} />   
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 3,
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 17,
    color: '#555',
    padding: 8,
  },
  postDetails: {
    fontSize: 15,
    fontFamily: 'Arial, sans-serif',
    color: '#555',
    margin:8,
  },
  buttonContainer: {
    backgroundColor: '#262626',
    borderRadius: 5,
    marginBottom:1,
    marginLeft: 245,
    width: 100, // Set width as needed
  },
  
});

export default Post;
