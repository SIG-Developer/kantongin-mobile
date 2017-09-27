import { compose, applyMiddleware, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
// import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const middlewares = [
  thunk,
];

// Apply logger if we are in debug mode.
if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ),
);

// AsyncStorage.clear();

export default store;
