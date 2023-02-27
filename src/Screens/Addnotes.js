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
import {useRoute} from '@react-navigation/native';

const Addnotes = ({navigation}) => {
  const route = useRoute();

  const [values, setValues] = useState({});

  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
  };

  const saveDetailes = async () => {
    if (values !== {} || values.title !== '') {
      try {
        let x = [];
        let id = 1;
        let y = await EncryptedStorage.getItem('notes');
        let data = JSON.parse(y);

        if (data !== undefined) {
          data.data.map((itm, index) => {
            x.push(itm);
          });
          let last = data.data.slice(-1)[0];
          if (last !== undefined) {
            id = last.id;
            id++;
          }
        }
        if (route.params?.edit) {
          x.map(item => {
            if (item?.id === route.params?.item?.id) {
              item.title = values.title;
              item.desc = values.desc;
            }
          });
        } else {
          x.push({title: values.title, desc: values.desc, id: id});
        }

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
    } else {
      Alert.alert('Alert!', 'Title and Description are mandatory.');
    }
  };

  useEffect(() => {
    let data = route.params;
    if (data) {
      setValues({title: data.item?.title, desc: data.item?.desc});
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
      <TouchableOpacity onPress={() => saveDetailes()} style={styles.saveBtn}>
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
  saveBtn: {
    marginTop: 10,
    backgroundColor: 'green',
    width: width * 0.4,
    height: height * 0.05,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    // marginTop: height * 0.03,
  },
});
