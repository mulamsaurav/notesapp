import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/Components/AppNavigator.js';

const App = ({navigation}) => {
  return <AppNavigator navigation={navigation} />;
};

export default App;
