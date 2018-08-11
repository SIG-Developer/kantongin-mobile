import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  blockHeader: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '$darkColor',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 10,
  },
  btn: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '$grayColor',
  },
  btnText: {
    fontSize: '0.8rem',
  }
});

export default class BannerBlocks extends Component {
  static propTypes = {
    name: PropTypes.string,
    wrapper: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onPress: PropTypes.func,
  }

  static defaultProps = {
    items: []
  }

  renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.btn}
      onPress={() => this.props.onPress(item)}
    >
      <Text style={styles.btnText}>
        {item.page}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { items, name, wrapper } = this.props;
    const itemsList = items.map((item, index) => this.renderItem(item, index));
    return (
      <View style={styles.container}>
        {wrapper !== '' && <Text style={styles.blockHeader}>{name}</Text>}
        {itemsList}
      </View>
    );
  }
}
