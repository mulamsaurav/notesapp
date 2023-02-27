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
      setAllNotesData(x);
    } catch (error) {
      console.log('Data not found');
    }
  };

  const deleteNote = async idx => {
    Alert.alert('Alert!', 'Are you sure to delete?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: async () => {
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
        },
      },
    ]);
  };

  const renderFlatItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Addnotes', {item, edit: true})}
        style={styles.flatListContainer}>
        <View>
          <Text style={styles.flatListViewTitleTxt} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.flatListViewDecTxt} numberOfLines={1}>
            {item.desc}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.flatListDeleteBtn}
          onPress={() => deleteNote(index)}>
          <Text style={styles.flatListDeleteBtnTxt}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderFlatLastItem = () => {
    return <View style={{height: 10}} />;
  };
  const renderFlatEmptyItem = () => {
    return (
      <Text style={{alignSelf: 'center', color: 'black'}}>
        Add notes by clicking + button
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}
          data={allNotesData}
          renderItem={renderFlatItems}
          ListEmptyComponent={renderFlatEmptyItem}
          ListFooterComponent={renderFlatLastItem}
        />
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
    bottom: 15,
    right: 15,
  },
  addNotesBtnTxt: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
  flatListContainer: {
    height: 70,
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
  },
  flatListViewTitleTxt: {
    color: 'black',
    margin: 5,
    fontSize: 17,
    fontWeight: '700',
  },
  flatListViewDecTxt: {color: 'black', margin: 5},
  flatListDeleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e10000',
  },
  flatListDeleteBtnTxt: {color: 'white', fontSize: 18, fontWeight: '700'},
});
