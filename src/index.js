import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import './config';
import store from './store';
//import App from './containers/App';
import theme from './theme';
import { registerScreens } from './screens';

registerScreens(store, Provider);

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  rem: width > 340 ? 18 : 16,
  // $outline: 1,
  ...theme,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.startApp();
  }

  startApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'MainCatgory',
        title: 'Welcome',
        navigatorStyle: {},
        navigatorButtons: {}
      },
      drawer: {
        left: {
          screen: 'Drawer',
        },
        style: {
          drawerShadow: 'NO',
          leftDrawerWidth: 80,
          contentOverlayColor: 'rgba(0, 0, 0, 0.70)',
        },
      },
    });
  }
}

export default App;
