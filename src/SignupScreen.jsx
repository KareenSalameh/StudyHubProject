import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
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
      <View>
        <Text style={styles.signInText}>Create your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Full Name" />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"book"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Major" />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name={"envelope"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" />
      </View>
    
      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.signInButtonContainer}>
        <Text style={styles.signInText2}>Sign Up</Text>
        <AntDesign name={"arrowright"} style={styles.RowButton} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.haveAccount}>Already have an account? 
          <Text style={{textDecorationLine: "underline"}}> Log in here</Text>
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
  },
  signInText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
    marginBottom: 38,
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
    marginLeft: 220,
    marginVertical: 40,
  },
  signInText2: {
    color: "#262626",
    fontSize: 34,
    fontWeight: "bold",
    elevation: 15
  },
  RowButton: {
    color: "#262626",
    fontSize: 34,
  },
  haveAccount:{
    textAlign:"center",
    color:"#262626",
    fontSize: 15,
    marginBottom: 20,
  },
  leftVectorContainer:{
    position: "absolute",
    bottom: 0,
    left: 180,
    transform: [{ rotate: '145deg' }],
  },
  leftVectorImg:{
    width: 300,
    height: 100,
  }
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const SignupScreen = () => {
//   return (
//     <View>
//       <Text>SignupScreen</Text>
//     </View>
//   )
// }

// export default SignupScreen

// const styles = StyleSheet.create({})