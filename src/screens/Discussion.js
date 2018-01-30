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
      items: PropTypes.shape({}),
      fetching: PropTypes.bool,
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
      discussion: {},
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator, discussion, productDetail } = this.props;
    let activeDiscussion = discussion.items[`p_${productDetail.product_id}`];

    if (!activeDiscussion) {
      activeDiscussion = {
        disable_adding: false,
        average_rating: 0,
        posts: [],
        search: {
          page: 1,
          total_items: 0,
        },
      };
    }

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
            icon: iconsMap.create,
          },
        ],
      };
      // Remove add comment btn.
      if (activeDiscussion.disable_adding) {
        buttons.rightButtons = [];
      }

      navigator.setButtons(buttons);
    });

    this.setState({
      discussion: activeDiscussion,
    });

    navigator.setTitle({
      title: i18n.gettext('Comments & Reviews').toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { productDetail } = this.props;
    const activeDiscussion = nextProps.discussion.items[`p_${productDetail.product_id}`];
    this.setState({
      discussion: activeDiscussion,
    }, () => {
      this.requestSent = false;
    });
  }

  onNavigatorEvent(event) {
    const { discussion } = this.state;
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      } else if (event.id === 'newComment') {
        navigator.push({
          screen: 'WriteReview',
          backButtonTitle: '',
          passProps: {
            activeDiscussion: discussion,
          },
        });
      }
    }
  }

  handleLoadMore() {
    const { productDetail } = this.props;
    const { discussion } = this.state;
    const hasMore = discussion.search.total_items != discussion.posts.length; // eslint-disable-line

    if (hasMore && !this.requestSent && !this.props.discussion.fetching) {
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
    const { discussion } = this.state;
    return (
      <View style={styles.container}>
        <DiscussionList
          infinite
          type={discussion.type}
          items={discussion.posts}
          fetching={this.props.discussion.fetching}
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
