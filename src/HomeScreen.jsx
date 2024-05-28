import React, { useState } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Install this library for icons
import BottomNavBar from './BottomNavBar';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const posts = [
    { id: '1', author: 'Author 1', description: 'Description of Post 1' },
    { id: '2', author: 'Author 2', description: 'Description of Post 2' },
    { id: '3', author: 'Author 3', description: 'Description of Post 3' },
  ];

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handleHome = () => {
    navigation.navigate("Home");
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{item.author}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("./pics/topVector.png")}
          style={styles.topImage}
        />
        <Text style={styles.headerTitle}>Study</Text>
        <Text style={styles.headerTitle2}>Hub</Text>

        <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            {/* Add tantalizing filter options here */}
            <Button title="Close" onPress={toggleFilterModal} />
          </View>
        </View>
      </Modal>
      

      <View style={styles.bottomImageContainer}>
        <Image 
          source={require("./pics/topVector.png")}
          style={styles.topImage2}
        />
        
        <BottomNavBar navigation={navigation} />

      </View>


     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  topImage: {
    width: "100%",
    height: 170,
  },
  filterButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: 'transparent',
    zIndex: 1,
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
      left: 50,
      fontWeight: 'bold',
      color: '#fff',
      },
  postsList: {
    paddingHorizontal: 16,
  },
  post: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  bottomImageContainer:{
    alignItems: 'center',
    height: 90,
    transform: [{ rotate: '180deg' }]
  },
  topImage2:{
    width: "130%",
    height: 160,
    bottom:20,
    right:60,
  },
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

export default HomeScreen;
