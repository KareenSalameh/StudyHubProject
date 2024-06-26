import React, { useState, useEffect, useCallback } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';
import Post from './Post/Post';
import { fetchPosts, toggleFilterModal, resetFilter, applyFilter } from '../Logic/homeScreenLogic';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({studyTime: null,studyType: null,});

  useEffect(() => {
    fetchPosts(filterCriteria, setPosts);
  }, [filterCriteria]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts(filterCriteria, setPosts);
    }, [filterCriteria])
  );

  const handleAddPost = () => {
    navigation.navigate("AddPost");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image 
          source={require("../../assets/pics/topVector.png")}
          style={styles.topImage}
        />
        <Text style={styles.headerTitle}>Study</Text>
        <Text style={styles.headerTitle2}>Hub</Text>

        <TouchableOpacity onPress={() => toggleFilterModal(isFilterModalVisible, setFilterModalVisible)} style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPost} style={styles.AddPostButton}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
       
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post 
            userId={item.userId}
            key={item.id}
            id={item.id}
            profileImageUrl={item.profileImageUrl}
            fullName={item.fullName}
            description={item.description}
            meetingStartTime={item.meetingStartTime}
            estimatedStudyTime={item.estimatedStudyTime}
            studyTime={item.studyTime}
            studyType={item.studyType}
            major={item.major}
            showActions={false}
            showActions2={true}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
      <Modal
        transparent={true}
        animationType="slide"
        visible={isFilterModalVisible}
        onRequestClose={() => toggleFilterModal(isFilterModalVisible, setFilterModalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Options</Text>

            <View style={styles.filterOption}>
              <Text>Study Time:</Text>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setFilterCriteria({ ...filterCriteria, studyTime: 'Day' })}
              >
                <Text>Day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setFilterCriteria({ ...filterCriteria, studyTime: 'Night' })}
              >
                <Text>Night</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterOption}>
              <Text>Partner or Group :</Text>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setFilterCriteria({ ...filterCriteria, studyType: 'Partner' })}
              >
                <Text>Partner</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setFilterCriteria({ ...filterCriteria, studyType: 'Group' })}
              >
                <Text>Group</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Reset" onPress={() => resetFilter(setFilterCriteria)} />
              <Button title="Apply" onPress={() => applyFilter(setFilterModalVisible, () => fetchPosts(filterCriteria, setPosts))} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomImageContainer}>
        <Image 
          source={require("../../assets/pics/topVector.png")}
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
    height: 158,
  },
  filterButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  AddPostButton: {
    position: 'absolute',
    top: 35,
    right: 70,
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
    left: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  postsList: {
    paddingHorizontal: 18,
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
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton: {
    marginLeft: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#ba5997',
  
  },
  bottomImageContainer: {
    alignItems: 'center',
    height: 90,
    transform: [{ rotate: '180deg' }]
  },
  topImage2: {
    width: "190%",
    height: 160,
    bottom: 20,
    right: 100,
  },
  input: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  
});

export default HomeScreen;
