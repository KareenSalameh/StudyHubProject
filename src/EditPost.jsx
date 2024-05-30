import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const EditPost = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [description, setDescription] = useState('');
  const [estimatedStudyTime, setEstimatedStudyTime] = useState('');
  const [major, setMajor] = useState('');
  const [studyTime, setStudyTime] = useState('Day');
  const [studyType, setStudyType] = useState('Partner');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const firestore = getFirestore();
        const postDoc = await getDoc(doc(firestore, "posts", postId));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost(postData);
          setDescription(postData.description);
          setEstimatedStudyTime(postData.estimatedStudyTime);
          setMajor(postData.major);
          setStudyTime(postData.studyTime);
          setStudyType(postData.studyType);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      const firestore = getFirestore();
      await updateDoc(doc(firestore, "posts", postId), {
        description,
        estimatedStudyTime,
        major,
        studyTime,
        studyType
      });
      Alert.alert('Success', 'Post updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while updating the post');
      console.error("Error updating post:", error);
    }
  };

  if (!post) {
    return null; // or a loading spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Post</Text>
      <TextInput
        style={styles.textInput1}
        value={description}
        onChangeText={setDescription}
        placeholder="Edit Description"
        multiline
      />
      <TextInput
        style={styles.textInput}
        value={estimatedStudyTime}
        onChangeText={setEstimatedStudyTime}
        placeholder="Edit Estimated Study Time"
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Day or Night Hours:</Text>
        <Picker
          selectedValue={studyTime}
          style={styles.picker}
          onValueChange={(itemValue) => setStudyTime(itemValue)}
        >
          <Picker.Item label="Day" value="Day" />
          <Picker.Item label="Night" value="Night" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Partner or Group:</Text>
        <Picker
          selectedValue={studyType}
          style={styles.picker}
          onValueChange={(itemValue) => setStudyType(itemValue)}
        >
          <Picker.Item label="Partner" value="Partner" />
          <Picker.Item label="Group" value="Group" />
        </Picker>
      </View>
      <TextInput
        style={styles.textInput}
        value={major}
        onChangeText={setMajor}
        placeholder="Edit Major"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 70,
    textAlign: 'center',
  },
  textInput1: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
  },
  pickerContainer: {
    marginBottom: 30,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditPost;
