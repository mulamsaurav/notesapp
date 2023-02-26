import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Allnotes from '../Screens/Allnotes.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Addnotes from '../Screens/Addnotes.js';
import HeaderRight from './HeaderRight.js';

const Stack = createNativeStackNavigator();

const AppNavigator = ({navigation}) => {
  //   const navigation = useNavigation();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Allnotes" component={Allnotes} />
        <Stack.Screen
          name="Addnotes"
          component={Addnotes}
          //   options={{
          //     // headerTitle: () => ""/>,
          //     headerRight: () => <HeaderRight navigation={navigation} />,
          //   }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
