import React, { useState, useEffect } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import BottomNavBar from './BottomNavBar';
import Post from './Post';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const postsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const handleAddPost = () => {
    navigation.navigate("AddPost");
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

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
        <TouchableOpacity onPress={handleAddPost} style={styles.AddPostButton}>
          <Ionicons name="add-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            userName={item.userName}
            description={item.description}
            estimatedStudyTime={item.estimatedStudyTime}
            studyTime={item.studyTime}
            studyType={item.studyType}
            major={item.major}
          />
        )}
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
  descriptionContainer: {
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 3,
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 17,
    color: '#555',
    padding: 8,
  },
  postDetails: {
    fontSize: 15,
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
  bottomImageContainer: {
    alignItems: 'center',
    height: 90,
    transform: [{ rotate: '180deg' }]
  },
  topImage2: {
    width: "130%",
    height: 160,

    bottom: 20,
    right: 60,
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
});

export default HomeScreen;
// // HomeScreen.js
// import React, { useState, useEffect } from 'react';
// import { Image, Text, View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons'; // Install this library for icons
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import BottomNavBar from './BottomNavBar';
// import Post from './Post';

// const HomeScreen = () => {
//   const navigation = useNavigation();

//   const [isFilterModalVisible, setFilterModalVisible] = useState(false);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const firestore = getFirestore();
//         const querySnapshot = await getDocs(collection(firestore, 'posts'));
//         const postsArray = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setPosts(postsArray);
//       } catch (error) {
//         console.error("Error fetching posts: ", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleAddPost = () => {
//     navigation.navigate("AddPost");
//   };

//   const toggleFilterModal = () => {
//     setFilterModalVisible(!isFilterModalVisible);
//   };

//   const renderPost = ({ item }) => (
//     <Post
//       userName={item.userName}
//       description={item.description}
//       estimatedStudyTime={item.estimatedStudyTime}
//       studyTime={item.studyTime}
//       studyType={item.studyType}
//       major={item.major}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.topImageContainer}>
//         <Image 
//           source={require("./pics/topVector.png")}
//           style={styles.topImage}
//         />
//         <Text style={styles.headerTitle}>Study</Text>
//         <Text style={styles.headerTitle2}>Hub</Text>

//         <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
//           <Ionicons name="filter-outline" size={24} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleAddPost} style={styles.AddPostButton}>
//           <Ionicons name="add-outline" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={posts}
//         renderItem={renderPost}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.postsList}
//       />
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={isFilterModalVisible}
//         onRequestClose={toggleFilterModal}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter Options</Text>
//             {/* Add tantalizing filter options here */}
//             <Button title="Close" onPress={toggleFilterModal} />
//           </View>
//         </View>
//       </Modal>

//       <View style={styles.bottomImageContainer}>
//         <Image 
//           source={require("./pics/topVector.png")}
//           style={styles.topImage2}
//         />
//         <BottomNavBar navigation={navigation} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   topImageContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   topImage: {
//     width: "100%",
//     height: 170,
//   },
//   filterButton: {
//     position: 'absolute',
//     top: 35,
//     right: 20,
//     padding: 8,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#fff",
//     backgroundColor: 'transparent',
//     zIndex: 1,
//   },
//   AddPostButton:{
//     position: 'absolute',
//     top: 35,
//     right: 70,
//     padding: 8,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#fff",
//     backgroundColor: 'transparent',
//     zIndex: 1,
//   },
//   headerTitle: {
//     position: 'absolute',
//     top: 50,
//     fontSize: 32,
//     left: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerTitle2: {
//     position: 'absolute',
//     top: 80,
//     fontSize: 32,
//     left: 60,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   postsList: {
//     paddingHorizontal: 16,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: 300,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   bottomImageContainer:{
//     alignItems: 'center',
//     height: 90,
//     transform: [{ rotate: '180deg' }]
//   },
//   topImage2:{
//     width: "130%",
//     height: 160,
//     bottom:20,
//     right:60,
//   },
//   bottomNavBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     bottom: 170,
//     width: 400,
//     padding: 10,
//     backgroundColor: 'transparent',
//     transform: [{ rotate: '180deg' }]
//   },
// });

// export default HomeScreen;

// // import React, { useState, useEffect } from 'react';
// // import { Image, Text, View, FlatList, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons'; // Install this library for icons
// // import BottomNavBar from './BottomNavBar';
// // import { getFirestore, collection, getDocs } from 'firebase/firestore';

// // const HomeScreen = () => {
// //   const navigation = useNavigation();

// //   const [isFilterModalVisible, setFilterModalVisible] = useState(false);
// //   const [posts, setPosts] = useState([]);
// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const firestore = getFirestore();
// //         const querySnapshot = await getDocs(collection(firestore, 'posts'));
// //         const postsArray = querySnapshot.docs.map(doc => ({
// //           id: doc.id,
// //           ...doc.data()
// //         }));
// //         setPosts(postsArray);
// //       } catch (error) {
// //         console.error("Error fetching posts: ", error);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   const handleAddPost = () => {
// //     navigation.navigate("AddPost");
// //   };
// //   const toggleFilterModal = () => {
// //     setFilterModalVisible(!isFilterModalVisible);
// //   };

// //   const renderPost = ({ item }) => (
// //     <View style={styles.post}>
// //       <Text style={styles.postTitle}>{item.userName}</Text>
// //       <Text style={styles.postDescription}>{item.description}</Text>
// //       <Text style={styles.postDetails}>Estimated Study Time: {item.estimatedStudyTime} hours</Text>
// //       <Text style={styles.postDetails}>Study Time: {item.studyTime}</Text>
// //       <Text style={styles.postDetails}>Study Type: {item.studyType}</Text>
// //       <Text style={styles.postDetails}>Major: {item.major}</Text>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.topImageContainer}>
// //         <Image 
// //           source={require("./pics/topVector.png")}
// //           style={styles.topImage}
// //         />
// //         <Text style={styles.headerTitle}>Study</Text>
// //         <Text style={styles.headerTitle2}>Hub</Text>

// //         <TouchableOpacity onPress={toggleFilterModal} style={styles.filterButton}>
// //           <Ionicons name="filter-outline" size={24} color="white" />
// //         </TouchableOpacity>
// //         <TouchableOpacity onPress={handleAddPost} style={styles.AddPostButton}>
// //           <Ionicons name="add-outline" size={24} color="white" />
// //         </TouchableOpacity>
// //       </View>
// //       <FlatList
// //         data={posts}
// //         renderItem={renderPost}
// //         keyExtractor={(item) => item.id}
// //         contentContainerStyle={styles.postsList}
// //       />
// //       <Modal
// //         transparent={true}
// //         animationType="slide"
// //         visible={isFilterModalVisible}
// //         onRequestClose={toggleFilterModal}
// //       >
// //         <View style={styles.modalBackground}>
// //           <View style={styles.modalContainer}>
// //             <Text style={styles.modalTitle}>Filter Options</Text>
// //             {/* Add tantalizing filter options here */}
// //             <Button title="Close" onPress={toggleFilterModal} />
// //           </View>
// //         </View>
// //       </Modal>
      

// //       <View style={styles.bottomImageContainer}>
// //         <Image 
// //           source={require("./pics/topVector.png")}
// //           style={styles.topImage2}
// //         />
        
// //         <BottomNavBar navigation={navigation} />

// //       </View>


     
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   topImageContainer: {
// //     position: 'relative',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   topImage: {
// //     width: "100%",
// //     height: 170,
// //   },
// //   filterButton: {
// //     position: 'absolute',
// //     top: 35,
// //     right: 20,
// //     padding: 8,
// //     borderRadius: 5,
// //     borderWidth: 1,
// //     borderColor: "#fff",
// //     backgroundColor: 'transparent',
// //     zIndex: 1,
// //   },
// //   AddPostButton:{
// //     position: 'absolute',
// //     top: 35,
// //     right: 70,
// //     padding: 8,
// //     borderRadius: 5,
// //     borderWidth: 1,
// //     borderColor: "#fff",
// //     backgroundColor: 'transparent',
// //     zIndex: 1,
// //   },
  
// //   headerTitle: {
// //     position: 'absolute',
// //     top: 50,
// //     fontSize: 32,
// //     left: 15,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //     },
// //     headerTitle2: {
// //       position: 'absolute',
// //       top: 80,
// //       fontSize: 32,
// //       left: 60,
// //       fontWeight: 'bold',
// //       color: '#fff',
// //       },
// //   postsList: {
// //     paddingHorizontal: 16,
// //   },
// //   post: {
// //     padding: 16,
// //     backgroundColor: '#f9f9f9',
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 2,
// //   },
// //   postTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 5,
// //   },
// //   postDescription: {
// //     fontSize: 16,
// //     color: '#555',
// //   },
// //   modalBackground: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //   },
// //   modalContainer: {
// //     width: 300,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   modalTitle: {
// //     fontSize: 20,
// //     marginBottom: 20,
// //   },
// //   bottomImageContainer:{
// //     alignItems: 'center',
// //     height: 90,
// //     transform: [{ rotate: '180deg' }]
// //   },
// //   topImage2:{
// //     width: "130%",
// //     height: 160,
// //     bottom:20,
// //     right:60,
// //   },
// //   bottomNavBar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     bottom: 170,
// //     width: 400,
// //     padding: 10,
// //     backgroundColor: 'transparent',
// //     transform: [{ rotate: '180deg' }]

// //   },
 
// // });

// // export default HomeScreen;
