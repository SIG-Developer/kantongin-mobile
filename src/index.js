import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Dimensions, AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import './config';
import store from './store';
import theme from './theme';
import registerScreens from './screens';

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
    // run app after store persist.
    persistStore(store, {
      blacklist: ['nav', 'products'],
      storage: AsyncStorage
    }, () => this.startApp());
  }

  startApp = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Layouts',
        navigatorStyle: {
          navBarBackgroundColor: theme.$navBarBackgroundColor,
          navBarButtonColor: theme.$navBarButtonColor,
          navBarButtonFontSize: theme.$navBarButtonFontSize,
          navBarTextColor: theme.$navBarTextColor,
          screenBackgroundColor: theme.$screenBackgroundColor,
        }
      },
      drawer: {
        left: {
          screen: 'Drawer',
        },
        style: {
          drawerShadow: 'NO',
          leftDrawerWidth: 80,
          contentOverlayColor: theme.$contentOverlayColor,
        },
      },
    });
  }
}

export default App;
