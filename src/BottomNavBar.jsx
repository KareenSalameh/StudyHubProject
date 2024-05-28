import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavBar = ({ navigation }) => {
  const handleHome = () => {
    // Handle navigation to Home screen
    navigation.navigate("Home");
  };

  const handleProfile = () => {
    // Handle navigation to Profile screen
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    // Handle logout
    navigation.navigate("Login");
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
    backgroundColor: 'transparent',
    transform: [{ rotate: '180deg' }]

  },
  navItem1: {
    alignItems: 'center',
    bottom:2,
    left: 35,
  },
  navItem2: {
    alignItems: 'center',
    left: 40,
  },
  navItem3: {
    alignItems: 'center',
    bottom:2,
    left: 45,
   
  },
  navItemText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 3,
  },
});

export default BottomNavBar;
