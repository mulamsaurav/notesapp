import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HeaderRight = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Allnotes')}>
      <Text>Done</Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
