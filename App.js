import React, { Component } from 'react';
import { Text, View } from 'react-native';


import Register from './Screens/Register';
import LoadingScreen from './Screens/LoadingScreen';
import ForgotPassword from './Screens/ForgotPassword';
import BottomTabNavigator from './navigation/bottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import Login from './Screens/LogIn';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LogInScreen" component={Login} />
      <Stack.Screen name="Register" component={Register} />
     
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
