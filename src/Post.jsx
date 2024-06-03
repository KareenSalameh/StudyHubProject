import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Post = ({ userId, id, userName, description,meetingStartTime, estimatedStudyTime, studyTime, studyType, major, onDelete, onEdit, showActions }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileImageUrl(data.profileImageUrl);
        }
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };

    fetchUserData();
  }, [userId]);


  useEffect(() => {
  }, [meetingStartTime]);

  const handleMeeting = async () => {
    const meetingId = '836 905 6609';
    const zoomMeetingLink = `https://zoom.us/j/${meetingId.replace(/\s/g, '')}`;
    // Open the Zoom meeting link
    Linking.openURL(zoomMeetingLink).catch((err) =>
      console.error('Error opening Zoom meeting:', err)
    );
  };
  const formatMeetingTime = (time) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleString(undefined, options);
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
