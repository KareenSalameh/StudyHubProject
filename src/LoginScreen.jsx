import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, AntDesign } from 'react-native-vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase'; // Import your Firebase auth instance
import { loginWithEmailAndPassword } from "./firebase";


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const result = await loginWithEmailAndPassword(email, password);
        if (result.user.uid) {
          navigation.navigate("Home");
        } else {
          alert("Invalid email or password. Please try again");
        }
        console.log(result);
      } catch (error) {
        alert("Invalid email or password. Please try again");
      }
      setEmail("");
      setPassword("");
    };
    const handleRegister = ()=>{
        navigation.navigate("SignUp");
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
      <View>
        <Text style={styles.signInText}>Log in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" value={email}
          onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry value={password}
          onChangeText={setPassword}/>
      </View>
      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      <TouchableOpacity style={styles.signInButtonContainer} onPress={handleLogin}>
        <Text style={styles.signInText2}>Log in</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name={"arrowright"} style={styles.RowButton} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
      <Text style={styles.donthaveAccount}>Don't have an account? 
        <Text style={{textDecorationLine : "underline"}} >Create here </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.leftVectorContainer}>
        <ImageBackground source=
            {require("./pics/v.jpg")} style={styles.leftVectorImg}/>

      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 180,
  },
  helloContainer: {},
  welcomeText: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#262626",
  },
  signInText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 50,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 60,
    elevation: 10,
    marginVertical: 20,
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
  forgotPasswordText: {
    color: "#BEBEBE",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 220,
    marginVertical: 80,
  },
  signInText2: {
    color: "#262626",
    fontSize: 34,
    fontWeight: "bold",
    elevation: 15
  },
  arrowContainer: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: "#d180b2",
    borderRadius: 17,
    width: 56,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10
  },
  RowButton: {
    color: "#262626",
    fontSize: 34,
  },
  donthaveAccount:{
    textAlign:"center",
    color:"#262626",
    fontSize: 15,
    marginBottom: 20,
  },
  leftVectorContainer:{
    position: "absolute",
    bottom: 0,
    left: -50,
    transform: [{ rotate: '220deg' }], // Rotate the image by 45 degrees

  },
  leftVectorImg:{
    width: 200,
    height: 100,
  
  }
});


