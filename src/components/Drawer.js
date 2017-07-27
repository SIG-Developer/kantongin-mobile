import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  btn: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  btnText: {
    fontSize: '0.8rem',
  }
});

class Drawer extends Component {
  renderItem = (text) => (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  render() {
    console.log(this.props);
    return (
      <ScrollView style={styles.container}>
        {this.renderItem('Home')}
        {this.renderItem('Search')}
        {this.renderItem('Profile')}
        {this.renderItem('Orders')}
        {this.renderItem('Logout')}
      </ScrollView>
    );
  }
}

export default Drawer;
