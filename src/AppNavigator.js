import React from 'react';
import {
  Platform,
} from 'react-native';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
// import EStyleSheet from 'react-native-extended-stylesheet';

import Cart from './containers/Cart';
import Search from './containers/Search';
import Orders from './containers/Orders';
import TabIcon from './components/TabIcon';
import Profile from './containers/Profile';
import Checkout from './containers/Checkout';
import LoginModal from './containers/LoginModal';
import Categories from './containers/Categories';
import MainCategory from './containers/MainCategory';
import ProductDetail from './containers/ProductDetail';
import CheckoutStepTwo from './containers/CheckoutStepTwo';
import CheckoutStepThree from './containers/CheckoutStepThree';

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
  },
  Orders: {
    screen: Orders,
    path: '/orders',
    navigationOptions: commonCardConfig,
  },
});

const CartStack = StackNavigator({
  index: {
    screen: Cart,
    path: '/',
    navigationOptions: commonCardConfig,
  },
  Checkout: {
    screen: Checkout,
    path: '/checkout',
    navigationOptions: commonCardConfig,
  },
  CheckoutStepTwo: {
    screen: CheckoutStepTwo,
    path: '/checkout/2',
    navigationOptions: commonCardConfig,
  },
  CheckoutStepThree: {
    screen: CheckoutStepThree,
    path: '/checkout/3',
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
  swipeEnabled: Platform.OS !== 'ios',
  tabBarPosition: 'bottom',
  lazy: true,
  tabBarOptions: {
    showLabel: false,
    inactiveTintColor: '#989898',
    activeTintColor: '#242424',
    indicatorStyle: {
      backgroundColor: '#242424',
    },
    style: {
      backgroundColor: '#FAFAFA',
    },
    showIcon: true,
    TabBarTop: {
      showIcon: true,
    }
  }
});

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeStack,
    path: '/',
  },
  Login: {
    screen: LoginModal,
    path: '/login',
  }
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Home',
});

export default AppNavigator;
