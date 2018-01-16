import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Rating from './Rating';

const styles = EStyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 0,
    flex: 1,
  },
  rating: {
    marginTop: -10,
  },
  msg: {
    color: '$discussionMessageColor',
    marginTop: -6,
    paddingBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingLeft: 14,
    paddingRight: 14,
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontWeight: '800',
    fontSize: '0.9rem',
  }
});

export default class DiscussionList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    infinite: PropTypes.bool,
    onEndReached: PropTypes.func,
  }

  static defaultProps = {
    items: [],
    infinite: false,
  }

  renderItem = item => (
    <View style={styles.itemContainer}>
      <View style={styles.itemWrapper}>
        <Text style={styles.name}>{item.name}</Text>
        <Rating value={item.rating_value} containerStyle={styles.rating} />
      </View>
      <Text style={styles.msg}>
        {item.message}
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          numColumns={1}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this.renderItem(item)}
          onEndReached={() => {
            console.log('end', this.props);
            if (this.props.infinite) {
              this.props.onEndReached();
            }
          }}
        />
      </View>
    );
  }
}
