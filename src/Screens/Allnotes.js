import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useIsFocused} from '@react-navigation/native';

const Allnotes = ({navigation}) => {
  const isFocused = useIsFocused();
  const [allNotesData, setAllNotesData] = useState([]);
  useEffect(() => {
    getAllNotes();
  }, [isFocused]);
  const getAllNotes = async () => {
    try {
      let x = [];
      let y = await EncryptedStorage.getItem('notes');
      let data = JSON.parse(y);
      data.data.map(itm => {
        x.push(itm);
      });
      console.log(x);
      setAllNotesData(x);
    } catch (error) {
      Alert.alert('Alert!', 'Something went wrong.');
    }
  };

  const deleteNote = async idx => {
    let temp = [];
    allNotesData.map((item, index) => {
      if (index !== idx) {
        temp.push(item);
      }
    });
    await EncryptedStorage.setItem(
      'notes',
      JSON.stringify({
        data: temp,
      }),
    );
    setAllNotesData(temp);
  };

  const renderFlatItems = ({item, index}) => {
    console.log('asdasd', item);
    return (
      <View
        style={{
          // justifyContent: 'center',
          // alignItems: 'flex-start',
          // width: '100%',

          height: 70,
          // borderWidth: 0.5,
          borderRadius: 10,
          marginVertical: 5,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 10,
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              margin: 5,
              fontSize: 17,
              fontWeight: '700',
            }}>
            {item.title}
          </Text>
          <Text style={{color: 'black', margin: 5}} numberOfLines={1}>
            {item.desc}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#e10000',
          }}
          onPress={() => deleteNote(index)}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
            X
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList data={allNotesData} renderItem={renderFlatItems} />
      </View>
      <TouchableOpacity
        style={styles.addNoteBtn}
        onPress={() => navigation.navigate('Addnotes')}>
        <Text style={styles.addNotesBtnTxt}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default React.memo(Allnotes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    // alignItems: 'center',
  },
  addNoteBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: '#e10000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 70,
    right: 25,
  },
  addNotesBtnTxt: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
});
