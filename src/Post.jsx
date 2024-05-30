import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Post = ({ id, userName, description, estimatedStudyTime, studyTime, studyType, major, onDelete, onEdit, showActions }) => {
    return (
      <View style={styles.post}>
        <View style={styles.header}>
          <Text style={styles.postTitle}>{userName}</Text>
          {showActions && (
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => onEdit(id)}>
                <Ionicons name="pencil-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(id)}>
                <Ionicons name="trash-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
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
    color: '#555',
    margin:8,
  },
  buttonContainer: {
    backgroundColor: '#262626',
    borderRadius: 5,
    marginBottom:1,
    marginLeft: 240,
    width: 100,
    marginTop: -30,
  },
  
});

export default Post;
