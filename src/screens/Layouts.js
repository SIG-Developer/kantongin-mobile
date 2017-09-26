import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';
import * as categoriesActions from '../actions/categoriesActions';
import * as layoutsActions from '../actions/layoutsActions';

// Components
import Spinner from '../components/Spinner';
import LayoutBlocks from '../components/LayoutBlocks';

// links
import theme from '../theme';
import config from '../config';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
  },
});

class Layouts extends Component {
  static propTypes = {
    layoutsActions: PropTypes.shape({
      fetchBlocks: PropTypes.func,
      fetchOrCreate: PropTypes.func,
    }),
    navigator: PropTypes.shape({}),
    layouts: PropTypes.shape({}),
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  }

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const { navigator, layouts } = this.props;
    navigator.setTitle({
      title: config.shopName.toUpperCase(),
    });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'sideMenu',
          icon: require('../assets/icons/bars.png'),
        },
      ],
      rightButtons: [
        {
          id: 'cart',
          component: 'CartBtn',
        },
        {
          id: 'search',
          icon: require('../assets/icons/search.png'),
        },
      ],
    });
    if (layouts.layoutId) {
      this.props.layoutsActions.fetchBlocks(layouts.layoutId, 'index.index');
    } else {
      this.props.layoutsActions.fetchOrCreate();
    }
  }

  renderBlocks() {
    const { layouts } = this.props;
    return (
      <LayoutBlocks
        blocks={layouts.blocks}
        location={'index.index'}
        navigation={this.props.navigator}
      />
    );
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  render() {
    const { layouts } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {layouts.fetching ? this.renderSpinner() : this.renderBlocks()}
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  notifications: state.notifications,
  categories: state.categories,
  layouts: state.layouts,
}),
dispatch => ({
  layoutsActions: bindActionCreators(layoutsActions, dispatch),
  categoriesActions: bindActionCreators(categoriesActions, dispatch),
  notificationsActions: bindActionCreators(notificationsActions, dispatch),
})
)(Layouts);
