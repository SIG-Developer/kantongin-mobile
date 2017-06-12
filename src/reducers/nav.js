import AppNavigator from '../AppNavigator';

// export default (state, action) => {
//   const newState = AppNavigator.router.getStateForAction(action, state);
//   return (newState ? newState : state);
// };

const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
