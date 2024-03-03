import React from 'react';
import{Text,View,StyleSheet} from 'react-native'
import Settings from '../Screens/Profile';
import HomeScreen from '../Screens/HomeScreen';
import CreateScreen from '../Screens/CreateScreen';
import LogoutScreen from '../Screens/Logout';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {  
  render() {
    return (
      <Tab.Navigator initialRouteName="Home" activeColor="#e32f45"
        labeled={false}
        barStyle={styles.bottomtabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = 30
            let iconMarginTop = -10
            let iconMarginLeft = 0

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';       
              color = focused ? '#e32f45' :'grey'
            }else if (route.name === 'Edit') {
              iconName = focused ? 'pencil' : 'pencil-outline';  
              color = focused? '#e32f45':'grey'
            }
            else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle';       
            color = focused ? '#e32f45' :'grey';

              
            }else if (route.name === 'Search') {
              iconName = focused ? 'person' : 'person';
              color = focused? '#e32f45':'grey'
            }
             else if (route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            
              color = focused? '#e32f45':'grey'
            }
            return (
              <Ionicons
                name={iconName}
                size={iconSize}
                color={color}
                style={[styles.icon, {marginTop: iconMarginTop, marginLeft : iconMarginLeft}]}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#e32f45',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Search" component={Settings} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
          );
        }
      }
const styles = StyleSheet.create({
  bottomtabStyle: {
    backgroundColor: 'white',
    height: 80,
    borderRadius:20,
    overflow: 'visible',
    position: 'absolute',
    justifyContent: 'center',
  },
  icon : {
    width:30,
    height:30,
    overflow: 'visible',
  }
});
