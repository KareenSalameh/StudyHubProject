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

// Inside your component or App.js

const Stack = createNativeStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({});
