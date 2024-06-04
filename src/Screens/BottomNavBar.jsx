import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavBar = ({ navigation }) => {
  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleMyPosts = () => {
    navigation.navigate("MyPosts");
  };

  return (
    <View style={styles.bottomNavBar}>
    <TouchableOpacity style={styles.navItem1} onPress={handleHome}>
      <Ionicons name="home-outline" size={30} color="white" />
      <Text style={styles.navItemText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem2} onPress={handleProfile}>
      <Ionicons name="person-circle-outline" size={30} color="white" />
      <Text style={styles.navItemText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.MypostItem} onPress={handleMyPosts}>
      <Ionicons name="list-outline" size={30} color="white"/>
      <Text style={styles.navItemText}>My Posts</Text>

    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem3} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={30} color="white" />
      <Text style={styles.navItemText}>Logout</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: 170,
    width: 400,
    padding: 10,
    transform: [{ rotate: '180deg' }]

  },
  navItem1: {
    position: 'absolute',
    alignItems: 'center',
    bottom:13,
    left: 40,
    color: '#262626',
  },
  MypostItem:{
    position: 'absolute',
    alignItems: 'center',
    bottom:13,
    right: 205,
    color: '#262626',
  },
  navItem2: {
    position: 'absolute',
    alignItems: 'center',
    right: 108,
    bottom:9,
  },
  navItem3: {
    position: 'absolute',
    alignItems: 'center',
    bottom:14,
    right: 7,
  
  },
  navItemText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 3,
  },
});

export default BottomNavBar;
