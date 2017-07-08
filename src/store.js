import { compose, applyMiddleware, createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
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

// begin periodically persisting the store
persistStore(store, {
  blacklist: ['nav', 'products'],
  storage: AsyncStorage
});

AsyncStorage.clear();

export default store;
