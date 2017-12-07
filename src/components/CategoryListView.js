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
    width: '33.33333%',
    padding: 5,
  },
  wrapper: {
    height: 150,
    position: 'relative',
    marginTop: 5,
    backgroundColor: '$categoryBlockBackgroundColor',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dadada',
    overflow: 'hidden',
    borderRadius: '$categoryBorderRadius',
  },
  categoryImage: {
    height: 100,
    width: '100%',
    resizeMode: 'cover',
  },
  categoryTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    textAlign: 'center',
    fontSize: '0.8rem',
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '$categoryBlockBackgroundColor',
    color: '$categoryBlockTextColor',
  },
  noImage: {
    backgroundColor: '#ececec',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 40,
    height: 40,
    opacity: 0.2,
  },
});

const emptyImage = require('../assets/icons/shopping_bag.png');

const CategoryListView = ({ category, onPress }) => {
  let imageUri = null;
  if ('main_pair' in category) {
    imageUri = category.main_pair.detailed.http_image_path;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
    >
      <View style={styles.wrapper}>
        {imageUri ?
          <Image source={{ uri: imageUri }} style={styles.categoryImage} />
          :
          <View style={styles.noImage}>
            <Image source={emptyImage} style={styles.emptyImage} />
          </View>
        }
        <View style={styles.categoryTitleWrapper}>
          <Text numberOfLines={2} style={styles.categoryTitle}>{category.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryListView.propTypes = {
  category: PropTypes.shape({
    item: PropTypes.objetc,
  }),
  onPress: PropTypes.func,
};

export default CategoryListView;
