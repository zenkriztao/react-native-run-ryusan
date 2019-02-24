import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator,
  createAppContainer } from 'react-navigation'
//Icons
import Icon  from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'

//import AppContainer

import List from './src/screens/List';
import Lelang from './src/screens/Lelang';
import Market from './src/screens/Market';
import Profile from './src/screens/Profile';
import Inbox from './src/screens/Inbox';

const AppNavigator = createBottomTabNavigator({

  List: {
    screen: List,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="game-controller" color={tintColor} size={24} />
      )
    }
  },
  Lelang: {
    screen: Lelang,
    navigationOptions: {
      fontWeight: 24,
      tabBarLabel: 'Lelang',
      tabBarIcon: ({ tintColor }) => (
        <Icon2 name="beenhere" color={tintColor} size={25} />
      )
    }
  },
  Market: {
    screen: Market,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'Market',
      tabBarIcon: ({ tintColor }) => ( 
        <Icon3 name="shopware" color={tintColor} size={24} />
      )
    }
  },
  Inbox: {
    screen: Inbox,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ tintColor }) => (
        <Icon2 name="chat" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="users" color={tintColor} size={24}  />
      )
    }
  }
}, {
    tabBarOptions: {
      fontWeight: 'Bold',
      animationEnabled: true,
        swipeEnabled: true,
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#212121',
        borderTopWidth: 5,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })

  export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



