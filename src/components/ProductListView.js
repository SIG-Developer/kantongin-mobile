import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 240,
  },
  productImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  description: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  productName: {
    color: '#BCBCBC',
    fontWeight: 'bold'
  },
  productPrice: {
    color: '#73626B'
  },
});

class ProductListView extends Component {
  render() {
    const item = this.props.product.item;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <View style={styles.container}>
          <Image
            style={styles.productImage}
            source={{ uri: item.main_pair.detailed.http_image_path }}
          />
          <View style={styles.description}>
            <Text
              numberOfLines={1}
              style={styles.productName}
            >
              {item.product}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductListView.propTypes = {
  product: PropTypes.shape({
    item: PropTypes.objetc,
  })
};

export default ProductListView;
