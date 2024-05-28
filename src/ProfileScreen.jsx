import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import BottomNavBar from './BottomNavBar';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");

  const fetchUserData = async () => {
    try {
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setBio(data.bio || "");
          setName(data.fullName);
          setEmail(data.email);
          setMajor(data.major);
          
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  const handleUpdate = async () => {
    if (user) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        fullName: name,
        email: email,
        major: major,
        bio: bio,
      });
      setIsEditing(false);
      setIsEditingBio(false);
      alert("Profile updated successfully!");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
  <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
    <Text style={styles.backButtonText}>Back to Home</Text>
  </TouchableOpacity>
  <BottomNavBar navigation={navigation} />

      <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={major}
            onChangeText={setMajor}
            placeholder="Major"
          />
        </>
      ) : (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.major}>{major}</Text>
        </>
      )}
      {isEditingBio ? (
        <TextInput
          style={styles.bioInput}
          placeholder="Add a bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      ) : (
        <Text style={styles.bio}>{bio}</Text>
      )}
      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
      </TouchableOpacity>
      {isEditing && (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingBio(!isEditingBio)}>
        <Text style={styles.editButtonText}>{isEditingBio ? 'Save Bio' : 'Edit Bio'}</Text>
      </TouchableOpacity>
      {isEditingBio && (
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Bio</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  major: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  bioInput: {
    width: '100%',
    height: 100,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#d180b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  
});

export default ProfileScreen;
