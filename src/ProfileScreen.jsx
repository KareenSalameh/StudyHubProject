import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from './BottomNavBar';
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      if (user) {
        setIsLoading(true);
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
          setProfileImageUrl(data.profileImageUrl);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
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
        profileImageUrl: profileImageUrl,
      });
      setIsEditing(false);
      setIsEditingBio(false);
      alert("Profile updated successfully!");
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      try {
        const selectedImage = result.assets[0];
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `profile_images/${selectedImage.fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Error uploading image:', error);
            alert('Failed to upload Image, Try again');
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setProfileImageUrl(downloadURL);
              saveUserDetails(user.uid, downloadURL); 
            });
          }
        );
      } catch (error) {
        console.error('Error picking image:', error);
        alert('Failed to upload Image, Try again');
      }
    }
  };

  const handleDeleteImage = async () => {
    setProfileImageUrl(null);
    if (user) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        profileImageUrl: null,
      });
      alert("Profile image deleted successfully!");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!userData) {
    return <Text>User data not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("./pics/topVector.png")}
          style={styles.topImage}
        />
        <Text style={styles.headerTitle}>Study</Text>
        <Text style={styles.headerTitle2}>Hub</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={isEditing ? handlePickImage : null}>
          <Image 
            source={profileImageUrl ? { uri: profileImageUrl } : require('./ava.png')} 
            style={[styles.profileImage, profileImageUrl ? {} : styles.defaultProfileImage]} 
          />
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteImage}>
            <Text style={styles.deleteButtonText}>Delete Photo</Text>
          </TouchableOpacity>
        )}

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
          <Text style={styles.editButtonText}>{isEditingBio ? 'Cancel' : 'Edit Bio'}</Text>
        </TouchableOpacity>

        {isEditingBio && (
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update Bio</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.bottomImageContainer}>
        <Image source={require("./pics/topVector.png")} style={styles.topImage2} />
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
    paddingHorizontal: 20,
    paddingBottom: 100, 
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
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 40,
    borderRadius :20,
  },
  defaultProfileImage: {},
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
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom:10,
    top:-20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  navBar: {
    transform: [{ rotate: '180deg' }]
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
// import * as ImagePicker from 'expo-image-picker';
// import BottomNavBar from './BottomNavBar';
// import { storage } from "./firebase";
// import { ref ,uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const [userData, setUserData] = useState(null);
//   const [bio, setBio] = useState("");
//   const [profileImageUrl, setProfileImageUrl] = useState(null);
//   const [isEditingBio, setIsEditingBio] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [major, setMajor] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchUserData = async () => {
//     try {
//       if (user) {
//         setIsLoading(true);
//         const firestore = getFirestore();
//         const userDocRef = doc(firestore, "users", user.uid);
//         const userDoc = await getDoc(userDocRef);
  
//         if (userDoc.exists()) {
//           const data = userDoc.data();
//           setUserData(data);
//           setBio(data.bio || "");
//           setName(data.fullName);
//           setEmail(data.email);
//           setMajor(data.major);
//           setProfileImageUrl(data.profileImageUrl);
//         }
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setIsLoading(false);
//     }
//   };

//   const handleUpdate = async () => {
//     if (user) {
//       const firestore = getFirestore();
//       const userDocRef = doc(firestore, "users", user.uid);
//       await updateDoc(userDocRef, {
//         fullName: name,
//         email: email,
//         major: major,
//         bio: bio,
//         profileImageUrl: profileImageUrl,
//       });
//       setIsEditing(false);
//       setIsEditingBio(false);
//       alert("Profile updated successfully!");
//     }
//   };

//   const handlePickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({ mediaType: 'photo' });
//     if (result.assets && result.assets.length > 0) {
//       try {
//         const selectedImage = result.assets[0];
//         const response = await fetch(selectedImage.uri);
//         const blob = await response.blob();
//         const storageRef = ref(storage, `profile_images/${selectedImage.fileName}`);
//         const uploadTask = uploadBytesResumable(storageRef, blob);
  
//         uploadTask.on(
//           'state_changed',
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress}% done`);
//           },
//           (error) => {
//             console.error('Error uploading image:', error);
//             alert('Failed to upload Image, Try again');
//           },
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               console.log('File available at', downloadURL);
//               setProfileImageUrl(downloadURL);
//               saveUserDetails(user.uid, downloadURL); 
//             });
//           }
//         );
//       } catch (error) {
//         console.error('Error picking image:', error);
//         alert('Failed to upload Image, Try again');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }
//   if (!userData) {
//     return <Text>User data not found.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.topImageContainer}>
//         <Image 
//           source={require("./pics/topVector.png")}
//           style={styles.topImage}
//         />
//         <Text style={styles.headerTitle}>Study</Text>
//         <Text style={styles.headerTitle2}>Hub</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
      
//         <TouchableOpacity onPress={isEditing ? handlePickImage : null}>
//         <Image 
//           source={profileImageUrl ? { uri: profileImageUrl } : require('./ava.png')} 
//           style={[styles.profileImage, profileImageUrl ? {} : styles.defaultProfileImage]} 
//         />
//         </TouchableOpacity>
       

//         {isEditing ? (
//           <>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="Full Name"
//             />
//             <TextInput
//               style={styles.input}
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//             />
//             <TextInput
//               style={styles.input}
//               value={major}
//               onChangeText={setMajor}
//               placeholder="Major"
//             />
//           </>
//         ) : (
//           <>
//             <Text style={styles.name}>{name}</Text>
//             <Text style={styles.email}>{email}</Text>
//             <Text style={styles.major}>{major}</Text>
//           </>
//         )}

//         {isEditingBio ? (
//           <TextInput
//             style={styles.bioInput}
//             placeholder="Add a bio"
//             value={bio}
//             onChangeText={setBio}
//             multiline
//           />
//         ) : (
//           <Text style={styles.bio}>{bio}</Text>
//         )}

//         <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
//           <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
//         </TouchableOpacity>
        
//         {isEditing && (
//           <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
//             <Text style={styles.updateButtonText}>Update Profile</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.editButton} onPress={() => setIsEditingBio(!isEditingBio)}>
//           <Text style={styles.editButtonText}>{isEditingBio ? 'Cancel' : 'Edit Bio'}</Text>
//         </TouchableOpacity>

//         {isEditingBio && (
//           <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
//             <Text style={styles.updateButtonText}>Update Bio</Text>
//           </TouchableOpacity>
//         )}
//       </ScrollView>

//       <View style={styles.bottomImageContainer}>
//         <Image source={require("./pics/topVector.png")} style={styles.topImage2} />
//         <BottomNavBar navigation={navigation} />
//       </View>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   topImageContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   topImage: {
//     width: "100%",
//     height: 160,
//   },
//   headerTitle: {
//     position: 'absolute',
//     top: 50,
//     fontSize: 32,
//     left: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerTitle2: {
//     position: 'absolute',
//     top: 80,
//     fontSize: 32,
//     left: 60,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   scrollContainer: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingBottom: 100, 
//   },
//   bottomImageContainer: {
//     alignItems: 'center',
//     height: 90,
//     transform: [{ rotate: '180deg' }]
//   },
//   topImage2: {
//     width: "190%",
//     height: 160,
//     bottom: 20,
//     right: 100,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     marginBottom:40,
//   },
//   defaultProfileImage: {
   

//   },  
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   email: {
//     fontSize: 18,
//     color: '#888',
//     marginBottom: 10,
//   },
//   major: {
//     fontSize: 18,
//     color: '#888',
//     marginBottom: 20,
//   },
//   bio: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 10,
//     textAlignVertical: 'top',
//   },
//   bioInput: {
//     width: '100%',
//     height: 100,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//     textAlignVertical: 'top',
//   },
//   updateButton: {
//     backgroundColor: '#d180b2',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   editButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   editButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: 'blue',
//   },
//   navBar: {
//     transform: [{ rotate: '180deg' }]
//   },
// });

// export default ProfileScreen;
