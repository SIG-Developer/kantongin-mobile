import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { get } from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_IMAGE_WIDTH } from '../utils';

const styles = EStyleSheet.create({
  container: {
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
    width: PRODUCT_IMAGE_WIDTH,
    height: PRODUCT_IMAGE_WIDTH,
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
    color: 'black',
    fontWeight: 'bold'
  },
  productPrice: {
    color: '#73626B',
    fontWeight: 'bold'
  },
});


const ProductListView = ({ onPress, product }) => {
  const { item } = product;
  const price = item.price_formatted ? item.price_formatted.price : item.price;
  const imageUri = get(item, 'main_pair.detailed.http_image_path');
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
    >
      {imageUri && <Image
        style={styles.productImage}
        source={{ uri: imageUri }}
      />}
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
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ProductListView.propTypes = {
  product: PropTypes.shape({
    item: PropTypes.object,
  }),
  onPress: PropTypes.func,
};

export default ProductListView;
