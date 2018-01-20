import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import DiscussionList from '../components/DiscussionList';

// Import actions.
import * as productsActions from '../actions/productsActions';

import theme from '../config/theme';
import i18n from '../utils/i18n';
import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
});

class Discussion extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      dismissModal: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    productDetail: PropTypes.shape({}),
    productsActions: PropTypes.shape({
      fetchDiscussion: PropTypes.func,
    }),
    discussion: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape({})),
      type: PropTypes.string,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  };

  constructor(props) {
    super(props);
    this.requestSent = false;

    this.state = {
      items: [],
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator, discussion } = this.props;
    iconsLoaded.then(() => {
      const buttons = {
        leftButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
        rightButtons: [
          {
            id: 'newComment',
            icon: iconsMap.comment,
          },
        ],
      };
      // Remove add comment btn.
      if (discussion.disable_adding) {
        buttons.rightButtons = [];
      }

      navigator.setButtons(buttons);
    });

    navigator.setTitle({
      title: i18n.gettext('Comments & Reviews').toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.discussion.posts.length !== this.state.items.length) {
      this.setState({
        items: nextProps.discussion.posts,
      }, () => {
        this.requestSent = false;
      });
    }
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      } else if (event.id === 'newComment') {
        navigator.push({
          screen: 'WriteReview',
          backButtonTitle: '',
        });
      }
    }
  }

  handleLoadMore() {
    const { discussion, productDetail } = this.props;
    const hasMore = discussion.search.total_items != discussion.posts.length; // eslint-disable-line

    if (hasMore && !this.requestSent && !discussion.fetching) {
      this.requestSent = true;
      this.props.productsActions.fetchDiscussion(
        productDetail.product_id,
        {
          page: discussion.search.page + 1,
        },
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <DiscussionList
          infinite
          type={this.props.discussion.type}
          items={this.state.items}
          onEndReached={() => this.handleLoadMore()}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    productDetail: state.productDetail,
    discussion: state.discussion,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(Discussion);
