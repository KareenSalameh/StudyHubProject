import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { handlePickImage } from '../../Logic/PhotoUpload';
import { handleSignUp } from '../../Logic/Auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onPickImage = async () => {
    const pickedImage = await handlePickImage();
    if (pickedImage) setImage(pickedImage);
  };

  const onSignUp = async () => {
    await handleSignUp(fullName, email, password, major, image, setUploading, navigation);
    setFullName("");
    setEmail("");
    setPassword("");
    setMajor("");
    setImage(null);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("../../assets/pics/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.welcomeText}>StudyHub</Text>
      </View>
      <TouchableOpacity style={styles.imagePicker} onPress={onPickImage}>
        <Text style={styles.imagePickerText}>Pick a new Image</Text>
        <View style={styles.imagePreviewContainer}>
          <Image 
            source={image ? { uri: image } : require('../../assets/pics/ava.png')} 
            style={styles.profileImage} 
          />
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
      <TouchableOpacity style={styles.signInButtonContainer} onPress={onSignUp} disabled={uploading}>
        <Text style={styles.signInText2}>{uploading ? "Signing Up..." : "Sign Up"}</Text>
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
        <Image source={require("../../assets/pics/v.jpg")} style={styles.leftVectorImg}/>
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
    top:60,
  },
  imagePreviewContainer: {
    width: 80,
    height: 80,
    marginTop: 5,
    left: 20,
    borderRadius :5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,

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