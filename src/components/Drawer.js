import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signInBtn: {
    backgroundColor: '#47C9AF',
    padding: 12,
  },
  signInBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '0.9rem',
  },
  itemBtn: {
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
  },
  itemBtnText: {
    fontSize: '0.9rem',
  },
  group: {
    marginTop: 40,
  }
});

class Drawer extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      resetTo: PropTypes.func,
      toggleDrawer: PropTypes.func,
    }),
  };

  renderLogo = () => (
    <Image
      source={{ uri: 'http://82.202.226.53/images/logos/1/cart.png' }}
      style={styles.logo}
    />
  );

  renderSearchBar = () => (
    <View style={styles.search} />
  );

  renderSignInBtn = () => (
    <TouchableOpacity style={styles.signInBtn}>
      <Text style={styles.signInBtnText}>
        Sign in
      </Text>
    </TouchableOpacity>
  );

  renderItem = (text, onPress) => (
    <TouchableOpacity
      style={styles.itemBtn}
      onPress={onPress}
    >
      <Text style={styles.itemBtnText}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { navigator } = this.props;
    return (
      <ScrollView style={styles.container}>
        {this.renderLogo()}
        {this.renderSignInBtn()}
        {this.renderSearchBar()}
        <View style={styles.group}>
          {this.renderItem('Home', () => {
            navigator.handleDeepLink({
              link: 'home/',
              payload: {},
            });
            navigator.toggleDrawer({
              side: 'left',
            });
          })}
          {this.renderItem('Cart', () => {
            navigator.handleDeepLink({
              link: 'cart/content',
              payload: {},
            });
            navigator.toggleDrawer({
              side: 'left',
            });
          })}
          {this.renderItem('My Profile')}
          {this.renderItem('Orders')}
        </View>
        <View style={styles.group}>
          {this.renderItem('About our company')}
          {this.renderItem('Privacy policy')}
        </View>
      </ScrollView>
    );
  }
}

export default Drawer;
