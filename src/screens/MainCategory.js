import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { blocks } from '../fakeData';
import { PRODUCT_NUM_COLUMNS } from '../utils';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';
import * as categoriesActions from '../actions/categoriesActions';
import * as layoutsActions from '../actions/layoutsActions';

// Components
import CategoryListView from '../components/CategoryListView';
import LayoutBlocks from '../components/LayoutBlocks';
import Spinner from '../components/Spinner';

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import i18n from '../utils/i18n';
import theme from '../theme';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

class MainCategory extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    notificationsActions: PropTypes.shape({
      hide: PropTypes.func,
    }),
    notifications: PropTypes.shape({
      items: PropTypes.array,
    }),
    categories: PropTypes.shape({
      items: PropTypes.array,
      tree: PropTypes.array,
    }),
    layoutsActions: PropTypes.shape({
      fetchBlocks: PropTypes.func,
    }),
    categoriesActions: PropTypes.shape({
      fetch: PropTypes.func,
    })
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
    const { navigator, categoriesActions, layoutsActions } = this.props;
    categoriesActions.fetch();
    layoutsActions.fetchBlocks(3, 'index.index');
    // FIXME: Set title
    navigator.setTitle({
      title: 'CS-Cart'.toUpperCase(),
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const { categories, navigator } = nextProps;
    this.setState({
      items: categories.tree,
    });
    if (nextProps.notifications.items.length) {
      const notify = nextProps.notifications.items[nextProps.notifications.items.length - 1];
      if (notify.closeLastModal) {
        navigator.dismissModal();
      }
      navigator.showInAppNotification({
        screen: 'Notification',
        passProps: {
          dismissWithSwipe: true,
          title: notify.title,
          type: notify.type,
          text: notify.text,
        },
      });
      this.props.notificationsActions.hide(notify.id);
    }
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    registerDrawerDeepLinks(event, navigator);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideMenu') {
        navigator.toggleDrawer({ side: 'left' });
      } else if (event.id === 'search') {
        navigator.showModal({
          screen: 'Search',
          title: i18n.gettext('Search'),
        });
      }
    }
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  renderList() {
    const { navigator } = this.props;
    return (
      <FlatList
        numColumns={PRODUCT_NUM_COLUMNS}
        data={this.state.items}
        keyExtractor={item => item.category_id}
        ListHeaderComponent={() => (
          <LayoutBlocks
            blocks={blocks}
            location={'mainPageTop'}
            navigation={navigator}
          />
        )}
        renderItem={item => (
          <CategoryListView
            category={item.item}
            index={item.index}
            onPress={() => navigator.push({
              screen: 'Categories',
              backButtonTitle: '',
              passProps: {
                navProps: {
                  category: item.item,
                }
              },
            })}
          />
        )}
        ListFooterComponent={() => (
          <LayoutBlocks
            blocks={blocks}
            location={'mainPageBottom'}
            navigation={navigator}
          />
        )}
      />
    );
  }

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.container}>
        {categories.fetching ? this.renderSpinner() : this.renderList()}
      </View>
    );
  }
}

export default connect(state => ({
  notifications: state.notifications,
  categories: state.categories,
}),
dispatch => ({
  layoutsActions: bindActionCreators(layoutsActions, dispatch),
  categoriesActions: bindActionCreators(categoriesActions, dispatch),
  notificationsActions: bindActionCreators(notificationsActions, dispatch),
})
)(MainCategory);
