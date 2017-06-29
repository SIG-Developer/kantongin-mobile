import React from 'react';
import {} from 'react-native';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainCategory from './containers/MainCategory';
import Categories from './containers/Categories';
import Cart from './containers/Cart';
import Profile from './containers/Profile';
import Search from './containers/Search';
import ProductDetail from './containers/ProductDetail';
import TabIcon from './components/TabIcon';

import theme from './theme';

const commonCardConfig = {
  headerStyle: {
    backgroundColor: theme.$headerBgColor,
  },
  headerTitleStyle: {
    color: theme.$headerTitleColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerBackTitle: ' ',
  headerTintColor: theme.$headerTintColor,
};

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
  ProductDetail: {
    screen: ProductDetail,
    path: '/product/:id',
    navigationOptions: commonCardConfig,
  }
});

const HomeStack = TabNavigator({
  Catalog: {
    screen: CatalogStack,
    path: '/catalog',
    navigationOptions: {
      tabBarLabel: 'Catalog',
      tabBarIcon: ({ tintColor }) => (
        <TabIcon
          name="bars"
          style={{ color: tintColor }}
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
        <TabIcon
          name={'search'}
          style={{ color: tintColor }}
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
        <TabIcon
          name={'shopping-cart'}
          style={{ color: tintColor }}
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
        <TabIcon
          name={'user'}
          style={{ color: tintColor }}
        />
      ),
    }
  },
}, {
  initialRouteName: 'Catalog',
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    showLabel: false,
    inactiveTintColor: '#989898',
    activeTintColor: '#242424',
    style: {
      backgroundColor: '#FAFAFA',
    }
  }
});

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeStack,
    path: '/',
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Home',
});

export default AppNavigator;
