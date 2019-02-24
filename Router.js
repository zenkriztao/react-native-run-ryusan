import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

//Icons
import Icon  from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
// Screens
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import CartList from './src/screens/CartList';
import Payment from './src/screens/Payment';
import PaymentDetail from './src/screens/PaymentDetail';
import Search from './src/screens/Search';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile';
import ProfileSetting from './src/screens/ProfileSetting';

// App Main Stack Navigator
const DashboardStackNavigator = createStackNavigator({
  // Login,
  ProductList,
  ProductDetail,
  CartList,
  Payment,
  Search,
  PaymentDetail,
});

// App Auth Stack Stack Navigator
const AuthStackNavigator = createStackNavigator({
  Login,
  Register
});

// App Profile Stack Navigator
const ProfileStackNavigator = createStackNavigator({
  Profile,
  ProfileSetting
});

// App Profile Switch Navigator
const ProfileSwitchNavigator = createSwitchNavigator({
  AuthStackNavigator,
  ProfileStackNavigator
});

// App Bottom Tab Navigator
const AppNavigator = createBottomTabNavigator({

  List: {
    screen: DashboardStackNavigator,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="game-controller" color={tintColor} size={24} />
      )
    }
  },
  Lelang: {
    screen: AuthStackNavigator,
    navigationOptions: {
      fontWeight: 24,
      tabBarLabel: 'Lelang',
      tabBarIcon: ({ tintColor }) => (
        <Icon2 name="beenhere" color={tintColor} size={25} />
      )
    }
  },
  Market: {
    screen: ProfileSwitchNavigator,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'Market',
      tabBarIcon: ({ tintColor }) => ( 
        <Icon3 name="shopware" color={tintColor} size={24} />
      )
    }
  },
  Inbox: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      fontWeight: 'Bold',
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="users" color={tintColor} size={24} />
      )
    }
  },

  },
 {
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

// App Container
const Router = createAppContainer(AppNavigator);

export default Router;
