import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './config';
import store from './store';
import App from './containers/App';

export default class Container extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
