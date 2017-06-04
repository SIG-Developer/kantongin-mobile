import React from 'react';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainCategory from './containers/MainCategory';
import Categories from './containers/Categories';
import Cart from './containers/Cart';
import Profile from './containers/Profile';
import Offline from './containers/Offline';

const styles = EStyleSheet.create({
  tabIcon: {
    fontSize: '1.2rem',
    color: 'black',
  }
});

const ModalsStack = StackNavigator({
  index: {
    screen: Profile,
    path: '/'
  },
  Offline: {
    screen: Offline,
    path: '/offline',
  }
}, {
  mode: 'modal',
});

const ProfileStack = StackNavigator({
  index: {
    screen: Profile,
    path: '/'
  }
});

const CatalogStack = StackNavigator({
  index: {
    screen: MainCategory,
    path: '/'
  },
  Category: {
    screen: Categories,
    path: '/category/:id'
  },
});

const AppNavigator = TabNavigator({
  Catalog: {
    screen: CatalogStack,
    path: '/catalog',
    navigationOptions: {
      tabBarLabel: 'Catalog',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'bars'}
          style={[styles.tabIcon, { color: tintColor }]}
        />
      ),
    }
  },
  Cart: {
    screen: Cart,
    path: '/cart',
    navigationOptions: {
      tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'shopping-cart'}
          style={[styles.tabIcon, { color: tintColor }]}
        />
      ),
    }
  },
  Profile: {
    screen: ProfileStack,
    path: '/profile',
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'user'}
          style={[styles.tabIcon, { color: tintColor }]}
        />
      ),
    }
  },
}, {
  swipeEnabled: true,
  tabBarOptions: {
    showLabel: false,
  }
});

export default AppNavigator;
