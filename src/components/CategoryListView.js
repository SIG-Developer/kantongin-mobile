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
    // borderBottomWidth: 1,
    // borderRightWidth: 1,
    // borderColor: '#dadada',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
  }
});

const CategoryListView = ({ category, onPress }) => {
  let imageUri = 'http://via.placeholder.com/140x140';
  if ('main_pair' in category) {
    imageUri = category.main_pair.detailed.http_image_path;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(category)}
    >
      <View style={styles.wrapper}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.categoryImage} />}
        <View style={styles.categoryTitleWrapper}>
          <Text numberOfLines={2} style={styles.categoryTitle}>{category.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryListView.defaultProps = {
  index: 0,
};

CategoryListView.propTypes = {
  category: PropTypes.shape({
    item: PropTypes.objetc,
  }),
  index: PropTypes.number,
  onPress: PropTypes.func,
};

export default CategoryListView;
