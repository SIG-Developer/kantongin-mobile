import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Rating from './Rating';

import {
  DISCUSSION_COMMUNICATION,
  DISCUSSION_COMMUNICATION_AND_RATING,
  DISCUSSION_RATING,
} from '../constants';
import i18n from '../utils/i18n';

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
    marginTop: 0,
    paddingBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingLeft: 14,
    paddingRight: 14,
  },
  itemContainerNoBorder: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontWeight: '800',
    fontSize: '0.9rem',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'gray',
    paddingLeft: 14,
    paddingBottom: 10,
    paddingTop: 4,
  },
});

export default class DiscussionList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    infinite: PropTypes.bool,
    onEndReached: PropTypes.func,
    type: PropTypes.string,
    fetching: PropTypes.bool,
  }

  static defaultProps = {
    items: [],
    infinite: false,
  }

  renderItem(item, index) {
    const { type } = this.props;
    const showRating = (
      type === DISCUSSION_RATING || type === DISCUSSION_COMMUNICATION_AND_RATING
    );
    const showMessage = (
      type === DISCUSSION_COMMUNICATION_AND_RATING || type === DISCUSSION_COMMUNICATION
    );
    const noUnderlineStyle = this.props.items.length === index + 1;

    return (
      <View style={[styles.itemContainer, noUnderlineStyle && styles.itemContainerNoBorder]}>
        <View style={styles.itemWrapper}>
          <Text style={styles.name}>{item.name}</Text>
          {showRating && <Rating value={item.rating_value} containerStyle={styles.rating} />}
        </View>
        {showMessage && <Text style={styles.msg}>{item.message}</Text>}
      </View>
    );
  }

  renderFooter() {
    if (!this.props.fetching) {
      return null;
    }

    return (
      <ActivityIndicator animating />
    );
  }

  renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        {i18n.gettext('No posts found')}
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.items}
          numColumns={1}
          keyExtractor={(item, index) => `disucssion_${index}`}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListFooterComponent={() => this.renderFooter()}
          ListEmptyComponent={() => this.renderEmpty()}
          onEndReached={() => {
            if (this.props.infinite) {
              this.props.onEndReached();
            }
          }}
        />
      </View>
    );
  }
}
