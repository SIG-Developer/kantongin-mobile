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
    productDetail: PropTypes.shape({
      discussion: PropTypes.shape({
        posts: PropTypes.arrayOf(PropTypes.shape({})),
      })
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

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator } = this.props;
    iconsLoaded.then(() => {
      navigator.setButtons({
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
      });
    });

    navigator.setTitle({
      title: i18n.gettext('Comments & Reviews').toUpperCase(),
    });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      } else if (event.id === 'post') {
        console.log('object');
      }
    }
  }

  handleLoadMore = () => {
    const { productDetail } = this.props;
    const totalItems =
      productDetail.discussion.search.items_per_page * productDetail.discussion.search.page;
    const hasMore = totalItems == productDetail.discussion.posts.length;
    console.log('call', hasMore, productDetail);
    if (hasMore) {
      this.props.productsActions.fetchDiscussion(productDetail.product_id, productDetail.discussion.search.page + 1);
    }
  }

  render() {
    const { productDetail } = this.props;

    return (
      <View style={styles.container}>
        <DiscussionList
          items={productDetail.discussion.posts}
          infinite
          onEndReached={() => this.handleLoadMore()}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    productDetail: state.productDetail,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(Discussion);
