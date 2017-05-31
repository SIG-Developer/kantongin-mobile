import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  render() {
    return (
      <Text>Profile</Text>
    );
  }
}

Profile.navigationOptions = () => {
  return {
    title: 'Profile',
  };
};

export default Profile;
