import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserData, handleMeeting, formatMeetingTime, handleQuotePress, handleClosePress } from '../../Logic/PostLogic';

const Post = ({ userId, id, description, meetingStartTime, estimatedStudyTime, studyTime, studyType, major, onDelete, onEdit, showActions, showActions2 }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [fullName, setUsername] = useState(null);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchUserData(userId, setProfileImageUrl, setUsername);
  }, [userId]);

  return (
    <View style={styles.post}>
      <View style={styles.user}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require(('../../assets/pics/ava.png'))}
          style={[styles.profileImage, profileImageUrl ? {} : styles.defaultProfileImage]}
        />
        <View style={styles.header}>
          <Text style={styles.postTitle}>{fullName}</Text>
        </View>
        {showActions2 && (
          <TouchableOpacity style={styles.EmojiButton} onPress={() => handleQuotePress(setQuote)}>
            <Ionicons name="mail-unread-outline" size={28} color="black" />
          </TouchableOpacity>
        )}
        {quote !== '' && (
          <View>
            <View style={styles.solidBackground} />
            <View style={styles.quoteTextContainer}>
              <TouchableOpacity onPress={() => handleClosePress(setQuote)} style={styles.closeIcon}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.quoteText}>{quote}</Text>
            </View>
          </View>
        )}
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
      <View style={styles.rowContainer}>
        <Text style={styles.postDetails}>
          <Text style={styles.postHeader}>Meeting Date: </Text>
          <Text style={styles.postValue}>{meetingStartTime ? formatMeetingTime(meetingStartTime) : 'Attending Now'}</Text>
        </Text>
        <TouchableOpacity style={styles.IconCalendar}>
          <Ionicons name="calendar-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.postDetails}>
        <Text style={styles.postHeader}>Estimated Study Time: </Text>
        {estimatedStudyTime} hours
      </Text>
      <Text style={styles.postDetails}>
        <Text style={styles.postHeader}>Study Time: </Text>
        {studyTime}
      </Text>
      <Text style={styles.postDetails}>
        <Text style={styles.postHeader}>Study Type: </Text>
        {studyType}
      </Text>
      <Text style={styles.postDetails}>
        <Text style={styles.postHeader}>Major: </Text>
        {major}
      </Text>
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
  user: {
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
  quoteTextContainer: {
    position: 'absolute',
    left: -140,
    backgroundColor: '#b35f90', 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    height: 'auto', 
    width: 240, 
    textAlign: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1, 
  },
  quoteText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22, 
    top: 8,
    marginBottom: 7,
  },
  closeIcon: {
    position: 'absolute',
    top: -10,
    right: -2,
    padding: 15,
  },
  solidBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 0,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 10,
    left: 280,
  },
  postTitle: {
    fontSize: 18,
    top: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    left: 10,
  },
  EmojiButton:{
    position:'absolute',
    left: 320,
    top:-5,
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
    margin: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeader: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  postValue: {
    flex: 1,
  },
  IconCalendar:{

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
