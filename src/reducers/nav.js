import AppNavigator from '../AppNavigator';

export default (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return (newState ? newState : state);
};
