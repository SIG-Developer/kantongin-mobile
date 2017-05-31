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
  },
  wrapper: {
    backgroundColor: '#47C9AF',
    height: 100,
    position: 'relative',
    marginTop: 10,
    marginLeft: 10,
  },
  wrapperRight: {
    marginRight: 10,
  },
  categoryImage: {
    height: 100,
    resizeMode: 'cover'
  },
  categoryTitle: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
  }
});

class CatalogListView extends Component {
  render() {
    const item = this.props.category.item;
    const index = this.props.category.index;
    let imageUri = null;
    if ('main_pair' in item) {
      imageUri = item.main_pair.detailed.http_image_path;
    }
    const oddStyle = index % 2 ? styles.wrapperRight : null;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <View style={styles.container}>
          <View style={[styles.wrapper, oddStyle]}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.categoryImage} />}
            <Text numberOfLines={2} style={styles.categoryTitle}>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

CatalogListView.propTypes = {
  category: PropTypes.shape({
    item: PropTypes.objetc,
    index: PropTypes.number,
  }),
  onPress: PropTypes.func,
};

export default CatalogListView;
