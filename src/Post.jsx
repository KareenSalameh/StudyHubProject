import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTeamsMeeting, authenticateApp } from './TeamsAPI';

const Post = ({ id, userName, profileImageUrl, description, estimatedStudyTime, studyTime, studyType, major, onDelete, onEdit, showActions }) => {
    const handleMeeting = async () => {
      const url = await createTeamsMeeting();
      if (url) {
        Linking.openURL(url);
      } else {
        alert('Failed to create Teams meeting');
      }
    };
  
    return (
      <View style={styles.post}>
        <View style={styles.user}>
          <Image
            source={profileImageUrl ? { uri: profileImageUrl } : require('./ava.png')}
            style={[styles.profileImage, profileImageUrl ? {} : styles.defaultProfileImage]}
          />
          <View style={styles.header}>
            <Text style={styles.postTitle}>{userName}</Text>
          </View>
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
          <TouchableOpacity style={styles.joinButton} onPress={handleMeeting}>
            <Text style={styles.joinButtonText}>Join Meeting</Text>
          </TouchableOpacity>
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
  user:{
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    left : 190,
  },
  postTitle: {
    fontSize: 18,
    top:10,
    fontWeight: 'bold',
    marginBottom: 20,
    left : 10,
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
    alignItems: 'flex-end',
    marginTop: -30,
  },
  joinButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  joinButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default Post;
