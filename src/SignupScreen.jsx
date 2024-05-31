import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, storage } from './firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('');
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !major) {
      alert("Please fill in all fields before signing up");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const profileImageUrl = await uploadImage(user.uid);
      saveUserDetails(user.uid, profileImageUrl);
      console.log("UserDetails:", user);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error signing up:", error);
      alert("An error occurred while signing up. Please try again.");
    }

    setFullName("");
    setEmail("");
    setPassword("");
    setMajor("");
    setImage(null); 
  };

  const uploadImage = async (userId) => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_images/${userId}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.log("Error getting download URL:", error);
        return null;
      }
    }
    return null;
  };

  const saveUserDetails = async (userId, profileImageUrl) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      fullName: fullName,
      email: email,
      major: major,
      profileImageUrl: profileImageUrl || null,
    });
    console.log("User data saved successfully!");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("./pics/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.welcomeText}>StudyHub</Text>
      </View>
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.imagePickerText}>Pick a new Image</Text>
        <View style={styles.imagePreviewContainer}>
          <Image source={require("./ava.png")} style={styles.profileImage} />
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Full Name" value={fullName}
          onChangeText={setFullName}/>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"book"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Major" value={major}
          onChangeText={setMajor}/>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"envelope"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" value={email}
          onChangeText={setEmail}/>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry value={password}
          onChangeText={setPassword}/>
      </View>
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleSignUp}>
        <Text style={styles.signInText2}>Sign Up</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name={"arrowright"} style={styles.RowButton} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.haveAccount}>Already have an account? 
          <Text style={{ textDecorationLine: "underline" }}> Log in here</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.leftVectorContainer}>
        <Image source={require("./pics/v.jpg")} style={styles.leftVectorImg}/>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 140,
  },
  helloContainer: {},
  welcomeText: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#262626",
    top: -12,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 45,
  },
  imagePickerText: {
    fontSize: 18,
    color: '#007BFF',
    left :130,
    top:50,
  },
  imagePreviewContainer: {
    width: 80,
    height: 80,
    marginTop: 5,
    left: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 60,
    elevation: 10,
    marginVertical: 12,
    height: 50,
    alignItems: "center",
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: "#262626",
  },
  signInButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 190,
    marginVertical: 35,
    marginBottom: 35,
  },
  signInText2: {
    color: "#262626",
    fontSize: 34,
    fontWeight: "bold",
    elevation: 15,
  },
  arrowContainer: {
    marginLeft: 15,
    marginTop: 5,
    backgroundColor: "#d180b2",
    borderRadius: 17,
    width: 56,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  RowButton: {
    color: "#262626",
    fontSize: 34,
  },
  haveAccount: {
    textAlign: "center",
    color: "#262626",
    fontSize: 15,
    marginRight: 90,
  },
  leftVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 180,
    transform: [{ rotate: '145deg' }],
  },
  leftVectorImg: {
    width: 300,
    height: 100,
  },
});

