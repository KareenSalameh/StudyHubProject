import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';

const AddPost = () => {
  const [description, setDescription] = useState('');
  const [estimatedStudyTime, setEstimatedStudyTime] = useState('');
  const [studyTime, setStudyTime] = useState('Day');
  const [studyType, setStudyType] = useState('Partner');
  const [major, setMajor] = useState('');
  const [fullName, setFullName] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchFullName() {
      try {
        if (user) {
          const firestore = getFirestore();
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFullName(userData.fullName);
          }
        }
      } catch (error) {
        console.error("Error fetching user's full name:", error);
      }
    }

    fetchFullName();
  }, [user]);

  const handlePublish = async () => {
    if (!user) {
      Alert.alert('Error', 'No user is logged in');
      return;
    }

    try {
      const firestore = getFirestore();
      await addDoc(collection(firestore, 'posts'), {
        userId: user.uid,
        userName: fullName,
        description: description,
        estimatedStudyTime: estimatedStudyTime,
        studyTime: studyTime,
        studyType: studyType,
        major: major,
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Post published successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while publishing the post');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>
      <TextInput
        style={styles.textInput1}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.textInput}
        placeholder="Estimated Study Time (hours)"
        value={estimatedStudyTime}
        onChangeText={setEstimatedStudyTime}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Day or Night Hours:</Text>
        <Picker
          selectedValue={studyTime}
          style={styles.picker}
          onValueChange={(itemValue) => setStudyTime(itemValue)}
        >
          <Picker.Item label="Day" value="Day" />
          <Picker.Item label="Night" value="Night" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Partner or Group:</Text>
        <Picker
          selectedValue={studyType}
          style={styles.picker}
          onValueChange={(itemValue) => setStudyType(itemValue)}
        >
          <Picker.Item label="Partner" value="Partner" />
          <Picker.Item label="Group" value="Group" />
        </Picker>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Major"
        value={major}
        onChangeText={setMajor}
      />
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publish</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
    <Text style={styles.backButtonText}>Back to Home</Text>
  </TouchableOpacity>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center',
  },
  textInput1: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
  },
  pickerContainer: {
    marginBottom: 30,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
  },
  publishButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { Picker } from '@react-native-picker/picker';

// const AddPost = () => {
//   const [description, setDescription] = useState('');
//   const [estimatedStudyTime, setEstimatedStudyTime] = useState('');
//   const [studyTime, setStudyTime] = useState('Day');
//   const [studyType, setStudyType] = useState('Partner');
//   const [major, setMajor] = useState('');

//   const navigation = useNavigation();
//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handlePublish = async () => {
//     if (!user) {
//       Alert.alert('Error', 'No user is logged in');
//       return;
//     }

//     try {
//       const firestore = getFirestore();
//       await addDoc(collection(firestore, 'posts'), {
//         userId: user.uid,
//         userName: user.displayName,
//         description: description,
//         estimatedStudyTime: estimatedStudyTime,
//         studyTime: studyTime,
//         studyType: studyType,
//         major: major,
//         createdAt: new Date(),
//       });
//       Alert.alert('Success', 'Post published successfully!');
//       navigation.navigate('Home');
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong while publishing the post');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Post</Text>
//       <TextInput
//         style={styles.textInput1}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />
//       <TextInput
//         style={styles.textInput}
//         placeholder="Estimated Study Time (hours)"
//         value={estimatedStudyTime}
//         onChangeText={setEstimatedStudyTime}
//         keyboardType="numeric"
//       />
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Day or Night Hours:</Text>
//         <Picker
//           selectedValue={studyTime}
//           style={styles.picker}
//           onValueChange={(itemValue) => setStudyTime(itemValue)}
//         >
//           <Picker.Item label="Day" value="Day" />
//           <Picker.Item label="Night" value="Night" />
//         </Picker>
//       </View>
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Partner or Group:</Text>
//         <Picker
//           selectedValue={studyType}
//           style={styles.picker}
//           onValueChange={(itemValue) => setStudyType(itemValue)}
//         >
//           <Picker.Item label="Partner" value="Partner" />
//           <Picker.Item label="Group" value="Group" />
//         </Picker>
//       </View>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Major"
//         value={major}
//         onChangeText={setMajor}
//       />
//       <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
//         <Text style={styles.publishButtonText}>Publish</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddPost;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop:50,
//     padding: 20,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 70,
//     textAlign: 'center',
//   },
//   textInput1: {
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//     borderRadius: 10,
//     marginBottom: 30,
//     elevation: 2,
//   },
//   textInput: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 30,
//     elevation: 2,
//   },
//   pickerContainer: {
//     marginBottom: 30,
//   },
//   pickerLabel: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     elevation: 2,
//   },
//   publishButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   publishButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
