import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const Addnotes = ({navigation}) => {
  const [values, setValues] = useState({});
  // const [notesData, setNotesData] = useState([]);

  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
  };

  const saveDetailes = async () => {
    try {
      let x = [];
      let y = await EncryptedStorage.getItem('notes');
      let data = JSON.parse(y);
      if (data !== null) {
        data.data.map(itm => {
          x.push(itm);
        });
      }
      x.push({title: values.title, desc: values.desc});
      await EncryptedStorage.setItem(
        'notes',
        JSON.stringify({
          data: x,
        }),
      );
      navigation.navigate('Allnotes');
    } catch (error) {
      console.log(error);
      Alert.alert('Alert!', 'Something went wrong.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View> */}
      <TextInput
        style={styles.inputContainer}
        placeholder="Enter Title"
        abel="Title"
        placeholderTextColor={'black'}
        value={values.title}
        onChangeText={v => onChange(v, 'title')}
      />
      <View style={styles.inputDescContainer}>
        <TextInput
          style={{fontSize: 18, color: 'black'}}
          placeholder="Enter Description"
          label="Description"
          placeholderTextColor={'black'}
          value={values.desc}
          multiline={true}
          onChangeText={v => onChange(v, 'desc')}
        />
      </View>
      {/* </View> */}
      <TouchableOpacity onPress={() => saveDetailes()}>
        <Text style={styles.saveBtnTxt}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Addnotes;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    fontSize: 18,
    width: width * 0.9,
    color: 'black',
    marginTop: 25,
  },
  inputDescContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.5,
    color: 'black',
    marginTop: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  saveBtnTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    marginTop: height * 0.03,
  },
});
