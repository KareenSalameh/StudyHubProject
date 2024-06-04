import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { fetchFullName, handlePublish, showDatePicker, hideDatePicker, handleConfirmDate } from '../../Logic/addPostLogic';

const AddPost = () => {
  const [description, setDescription] = useState('');
  const [estimatedStudyTime, setEstimatedStudyTime] = useState('');
  const [studyTime, setStudyTime] = useState('Day');
  const [studyType, setStudyType] = useState('Partner');
  const [major, setMajor] = useState('');
  const [fullName, setFullName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchFullName(user, setFullName);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>
      <TextInput
        style={styles.textInput1}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.textInput}
        placeholder="Estimated Study Time (hours)"
        value={estimatedStudyTime}
        onChangeText={setEstimatedStudyTime}
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
        placeholder="Major"
        value={major}
        onChangeText={setMajor}
      />
      <TouchableOpacity style={styles.datePickerButton} onPress={() => showDatePicker(setDatePickerVisibility)}>
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text>
            <Text style={styles.datePickerButtonText}>Select Meeting Date and Time</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.publishButton} onPress={() => handlePublish(user, fullName, description, estimatedStudyTime, studyTime, studyType, major, selectedDate, navigation)}>
        <Text style={styles.publishButtonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={(date) => handleConfirmDate(date, setSelectedDate, () => hideDatePicker(setDatePickerVisibility))}
        onCancel={() => hideDatePicker(setDatePickerVisibility)}
      />
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  textInput1: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 10,
    marginBottom: 25,
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
  datePickerButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Align icon and text vertically
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom:10,
    marginRight:10,
  },
  datePickerButtonText: {
    marginLeft: 10, // Add space between icon and text
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  publishButton: {
    backgroundColor:"#ba5997",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: "#ba5997",
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
