import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import has from 'lodash/has';

// Constants
import {
  BLOCK_BANNERS,
  BLOCK_CATEGORIES,
  BLOCK_PRODUCTS,
  BLOCK_PAGES,
  BLOCK_VENDORS,
} from '../constants';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';
import * as layoutsActions from '../actions/layoutsActions';

// Components
import Spinner from '../components/Spinner';
import BannerBlock from '../components/BannerBlock';
import VendorBlock from '../components/VendorBlock';
import PageBlock from '../components/PageBlock';
import ProductBlock from '../components/ProductBlock';
import CategoryBlock from '../components/CategoryBlock';
import PushNotificaitons from '../components/PushNotifications';

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import i18n from '../utils/i18n';
import { toArray } from '../utils';
import config from '../config';
import theme from '../config/theme';

import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

class Layouts extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
    navBarTextFontBold: false,
  }

  static propTypes = {
    layoutsActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
    notifications: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    notificationsActions: PropTypes.shape({
      hide: PropTypes.func,
    }),
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    layouts: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.isFetchBlocksSend = false;
    this.pushNotificationListener = null;
    this.pushNotificationOpenListener = null;
  }

  componentWillMount() {
    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            id: 'sideMenu',
            icon: iconsMap.menu,
          },
        ],
        rightButtons: [
          {
            id: 'cart',
            component: 'CartBtn',
            passProps: {},
          },
          {
            id: 'search',
            icon: iconsMap.search,
          },
        ],
      });
    });
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setTitle({
      title: config.shopName.toUpperCase(),
    });
    this.props.layoutsActions.fetch(config.layoutId, 'index.index');
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    if (config.pushNotifications) {
      PushNotificaitons.Init();
      this.pushNotificationListener = PushNotificaitons.RegisterPushListener(navigator);
      this.pushNotificationOpenListener = PushNotificaitons.RegisterOpenListener(navigator);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { navigator } = nextProps;
    if (nextProps.notifications.items.length) {
      const notify = nextProps.notifications.items[nextProps.notifications.items.length - 1];
      if (notify.closeLastModal) {
        navigator.dismissModal();
      }
      navigator.showInAppNotification({
        screen: 'Notification',
        autoDismissTimerSec: 1,
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

  componentWillUnmount() {
    if (config.pushNotifications) {
      this.pushNotificationListener();
      this.pushNotificationOpenListener();
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

  renderBlock = (block, index) => {
    const { navigator } = this.props;

    if (!has(block, 'content.items')) {
      return null;
    }

    const items = toArray(block.content.items);
    switch (block.type) {
      case BLOCK_BANNERS:
        return (
          <BannerBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(banner) => {
              navigator.handleDeepLink({
                link: banner.url,
                payload: {
                  ...banner,
                }
              });
            }}
            key={index}
          />
        );

      case BLOCK_PRODUCTS:
        return (
          <ProductBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(product) => {
              navigator.push({
                screen: 'ProductDetail',
                backButtonTitle: '',
                passProps: {
                  pid: product.product_id,
                }
              });
            }}
            key={index}
          />
        );

      case BLOCK_CATEGORIES:
        return (
          <CategoryBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(category) => {
              navigator.push({
                screen: 'Categories',
                backButtonTitle: '',
                passProps: {
                  category,
                }
              });
            }}
            key={index}
          />
        );

      case BLOCK_PAGES:
        return (
          <PageBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(page) => {
              navigator.push({
                screen: 'Page',
                title: page.page,
                backButtonTitle: '',
                passProps: {
                  uri: `${config.siteUrl}index.php?dispatch=pages.view&page_id=${page.page_id}`,
                },
              });
            }}
            key={index}
          />
        );

      case BLOCK_VENDORS:
        return (
          <VendorBlock
            name={block.name}
            wrapper={block.wrapper}
            items={items}
            onPress={(vendor) => {
              navigator.showModal({
                screen: 'Vendor',
                title: vendor.company,
                passProps: {
                  companyId: vendor.company_id,
                },
              });
            }}
            key={index}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { layouts } = this.props;
    const blocksList = layouts.blocks.map((block, index) => this.renderBlock(block, index));
    if (layouts.fetching) {
      return (<Spinner visible mode="content" />);
    }
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {blocksList}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    notifications: state.notifications,
    layouts: state.layouts,
  }),
  dispatch => ({
    layoutsActions: bindActionCreators(layoutsActions, dispatch),
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
  })
)(Layouts);
