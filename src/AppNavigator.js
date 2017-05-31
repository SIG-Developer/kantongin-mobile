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
import Products from './containers/Products';
import Profile from './containers/Profile';

const styles = EStyleSheet.create({
  tabIcon: {
    fontSize: '1.2rem',
    color: 'black',
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
  Products: {
    screen: Products,
    path: '/products'
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
    screen: Profile,
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
