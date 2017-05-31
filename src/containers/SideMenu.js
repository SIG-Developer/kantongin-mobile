import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as cartActions from '../actions/cartActions';

const styles = EStyleSheet.create({
  container: {
    width: 300,
    backgroundColor: '#fff',
    flex: 1,
  },
  userContainer: {
    height: 150,
    backgroundColor: '#00AAFF',
    paddingTop: 30,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cartContainer: {
    paddingTop: 10,
    paddingLeft: 14,
    paddingRight: 14,
    flex: 1,
  },
  cartTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',

  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1'
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  removeBtn: {
    color: 'red',
  },
  checkboutBtn: {
    padding: 10,
    fontSize: '1rem',
    backgroundColor: '#00D000',
    color: '#fff',
    textAlign: 'center'
  }
});

class SideMenu extends Component {
  renderItem(item) {
    return (
      <View style={styles.productItem}>
        <Image
          style={styles.productImage}
          source={{ uri: item.main_pair.detailed.http_image_path }}
        />
        <View>
          <Text>{item.product}</Text>
          <Text>{item.price}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.removeBtn}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { cart, nav, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text>User info will be here</Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Cart contents</Text>
          <FlatList
            data={cart.items}
            keyExtractor={item => item.product_id}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => {
            console.log(nav)
            navigation.navigate('Checkout');
          }}>
            <Text style={styles.checkboutBtn}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  nav: state.nav,
  cart: state.cart,
}),
  dispatch => ({
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(SideMenu);
