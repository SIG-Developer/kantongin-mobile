import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_IMAGE_WIDTH, formatPrice, getImagePath } from '../utils';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '$productBorderColor',
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 240,
    flex: 2,
    maxWidth: '50%',
  },
  productImage: {
    width: PRODUCT_IMAGE_WIDTH,
    height: PRODUCT_IMAGE_WIDTH,
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
  listDiscountWrapper: {
    backgroundColor: '$productDiscountColor',
    position: 'absolute',
    top: 4,
    right: 4,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 2,
  },
  listDiscountText: {
    color: '#fff',
  },
});

class ProductListView extends PureComponent {
  static propTypes = {
    product: PropTypes.shape({
      item: PropTypes.object,
    }),
    onPress: PropTypes.func,
  };

  render() {
    const { product, onPress } = this.props;
    const { item } = product;
    const price = item.price_formatted ? item.price_formatted.price : item.price;
    const imageUri = getImagePath(item);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(item)}
      >
        <View>
          {imageUri !== null && (
            <Image
              style={styles.productImage}
              source={{ uri: imageUri }}
              resizeMode="contain"
              resizeMethod="resize"
            />
          )}
        </View>
        {item.list_discount_prc && (
          <View style={styles.listDiscountWrapper}>
            <Text style={styles.listDiscountText}>
              {i18n.gettext('Save')} {`${item.list_discount_prc}%`}
            </Text>
          </View>
        )}
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
            {formatPrice(price)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductListView;
