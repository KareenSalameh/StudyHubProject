import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen'; 
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import AddPost from './src/AddPost';
import MyPosts from './src/MyPosts';

const Stack = createNativeStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="MyPosts" component={MyPosts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
