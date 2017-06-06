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
import Search from './containers/Search';

const styles = EStyleSheet.create({
  tabIcon: {
    fontSize: '1.2rem',
    color: 'red',
  }
});

const commonCardConfig = {
  headerStyle: {
    backgroundColor: '#FAFAFA',
  },
  headerTitleStyle: {
    color: '#242424',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerBackTitle: ' ',
  headerTintColor: '#242424'
};

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
    path: '/',
    navigationOptions: commonCardConfig,
  }
});

const CartStack = StackNavigator({
  index: {
    screen: Cart,
    path: '/',
    navigationOptions: commonCardConfig,
  },
  offline: {
    screen: Offline,
    path: '/offline',
    navigationOptions: {
      mode: 'modal'
    }
  }
});

const SearchStack = StackNavigator({
  index: {
    screen: Search,
    path: '/',
    navigationOptions: commonCardConfig,
  }
});

const CatalogStack = StackNavigator({
  index: {
    screen: MainCategory,
    path: '/',
    navigationOptions: commonCardConfig,
  },
  Category: {
    screen: Categories,
    path: '/category/:id',
    navigationOptions: commonCardConfig,
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
  Search: {
    screen: SearchStack,
    path: '/search',
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'search'}
          style={[styles.tabIcon, { color: tintColor }]}
        />
      ),
    }
  },
  Cart: {
    screen: CartStack,
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
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: false,
    inactiveTintColor: '#989898',
    activeTintColor: '#242424',
    style: {
      backgroundColor: '#FAFAFA',
    }
  }
});

export default AppNavigator;
