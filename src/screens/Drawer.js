import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import uniqueId from 'lodash/uniqueId';
import i18n from '../utils/i18n';

import theme from '../config/theme';
import * as authActions from '../actions/authActions';
import * as pagesActions from '../actions/pagesActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$drawerBgColor',
  },
  scroll: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    backgroundColor: '#4152AE',
    height: '10rem',
    position: 'relative',
  },
  headerUserName: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  headerUserNameText: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  headerUserMailText: {
    fontSize: '0.8rem',
    color: '#fff',
  },
  logo: {
    height: 40,
    width: 200,
    marginLeft: 20,
    marginTop: 14,
    resizeMode: 'contain',
  },
  logoLogin: {
    marginTop: 20,
  },
  signInBtn: {
    backgroundColor: 'transparent',
    padding: 12,
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  signInBtnText: {
    textAlign: 'left',
    color: '#fff',
    fontSize: '1rem',
  },
  itemBtn: {
    padding: 10,
    paddingLeft: 20,
  },
  mainMenu: {
    marginTop: 14,
  },
  itemBtnText: {
    fontSize: '0.9rem',
    paddingTop: 3,
    fontWeight: 'bold',
  },
  itemBtnWrapper: {
    flexDirection: 'row',
  },
  itemBtnIcon: {
    height: 24,
    width: 24,
    marginRight: 20,
    opacity: 0.8,
    tintColor: '#888888',
  },
  itemBadgeRed: {
    position: 'absolute',
    top: 1,
    right: 1,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD542A'
  },
  itemBadgeRedText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  itemBadgeGray: {
    position: 'absolute',
    top: 1,
    right: 1,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  itemBadgeGrayText: {
    color: 'black',
  },
  signOutBtn: {
    position: 'absolute',
    right: 5,
    top: 36,
    backgroundColor: 'transparent',
    padding: 14,
  },
  signOutBtnIcon: {
    height: 24,
    width: 24,
    tintColor: '#fff',
  },
  devider: {
    borderBottomWidth: 1,
    borderColor: '#F2F2F2',
    marginTop: 14,
    marginBottom: 14,
  }
});

const homeIcon = require('../assets/icons/home.png');
const shoppingCartIcon = require('../assets/icons/shopping-cart.png');
const profileIcon = require('../assets/icons/profile.png');
const ordersIcon = require('../assets/icons/receipt.png');
const logoutIcon = require('../assets/icons/exit.png');

class Drawer extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      resetTo: PropTypes.func,
      showModal: PropTypes.func,
      toggleDrawer: PropTypes.func,
      handleDeepLink: PropTypes.func,
      dismissModal: PropTypes.func,
      showInAppNotification: PropTypes.func,
    }),
    cart: PropTypes.shape({
      amount: PropTypes.number,
    }),
    pages: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    auth: PropTypes.shape({
      logged: PropTypes.bool,
    }),
    authActions: PropTypes.shape({
      logout: PropTypes.func,
    }),
    pagesActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
  };

  componentDidMount() {
    this.props.pagesActions.fetch();
  }

  handleOpenPage = (page) => {
    this.props.navigator.handleDeepLink({
      link: `page/${page.page_id}`,
      payload: {
        title: page.page,
      },
    });
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  }

  renderHeader() {
    const { cart, auth } = this.props;
    if (auth.logged) {
      return (
        <View style={styles.header}>
          <Image
            source={{ uri: theme.$logoUrl }}
            style={styles.logo}
          />
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={() => {
              this.props.authActions.logout();
              this.props.navigator.handleDeepLink({
                link: 'home/',
                payload: {},
              });
              this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true,
                to: 'close'
              });
            }}
          >
            <Image source={logoutIcon} style={styles.signOutBtnIcon} />
          </TouchableOpacity>
          <View style={styles.headerUserName}>
            <Text style={styles.headerUserNameText}>
              {cart.user_data.b_firstname} {cart.user_data.b_lastname}
            </Text>
            <Text style={styles.headerUserMailText}>
              {cart.user_data.email}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <Image
          source={{ uri: theme.$logoUrl }}
          style={[styles.logo, styles.logoLogin]}
        />
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => {
            this.props.navigator.toggleDrawer({
              side: 'left',
            });
            this.props.navigator.showModal({
              screen: 'Login',
            });
          }}
        >
          <Text style={styles.signInBtnText}>
            {i18n.gettext('Login | Registration')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem = (text, onPress, badge = 0, type = 'red') => {
    const renderBadge = () => {
      if (badge === 0) {
        return null;
      }
      let badgeStyle = styles.itemBadgeRed;
      let badgeTextStyle = styles.itemBadgeRedText;
      if (type === 'gray') {
        badgeStyle = styles.itemBadgeGray;
        badgeTextStyle = styles.itemBadgeGrayText;
      }
      return (
        <View style={badgeStyle}>
          <Text style={badgeTextStyle}>
            {badge}
          </Text>
        </View>
      );
    };
    return (
      <TouchableOpacity
        style={styles.itemBtn}
        onPress={onPress}
        key={uniqueId()}
      >
        <View>
          <Text style={styles.itemBtnText}>
            {text}
          </Text>
          {renderBadge()}
        </View>
      </TouchableOpacity>
    );
  };

  renderBadge = (badge, type = null) => {
    if (badge === 0) {
      return null;
    }
    let badgeStyle = styles.itemBadgeRed;
    let badgeTextStyle = styles.itemBadgeRedText;
    if (type === 'gray') {
      badgeStyle = styles.itemBadgeGray;
      badgeTextStyle = styles.itemBadgeGrayText;
    }
    return (
      <View style={badgeStyle}>
        <Text style={badgeTextStyle}>
          {badge}
        </Text>
      </View>
    );
  }

  render() {
    const { navigator, pages, auth } = this.props;
    const pagesList = pages.items
      .map(p => this.renderItem(p.page, () => this.handleOpenPage(p)));
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.scroll}>
          <View style={styles.mainMenu}>
            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => {
                navigator.handleDeepLink({
                  link: 'home/',
                  payload: {},
                });
                navigator.toggleDrawer({
                  side: 'left',
                });
              }}
            >
              <View style={styles.itemBtnWrapper}>
                <Image source={homeIcon} style={styles.itemBtnIcon} />
                <Text style={styles.itemBtnText}>
                  {i18n.gettext('Home')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemBtn}
              onPress={() => {
                navigator.showModal({
                  screen: 'Cart',
                });
                navigator.toggleDrawer({
                  side: 'left',
                });
              }}
            >
              <View style={styles.itemBtnWrapper}>
                <Image source={shoppingCartIcon} style={styles.itemBtnIcon} />
                <Text style={styles.itemBtnText}>
                  {i18n.gettext('Cart')}
                </Text>
                {this.renderBadge(this.props.cart.amount)}
              </View>
            </TouchableOpacity>

            {auth.logged &&
              <TouchableOpacity
                style={styles.itemBtn}
                onPress={() => {
                  navigator.handleDeepLink({
                    link: 'profile/',
                    payload: {},
                  });
                  navigator.toggleDrawer({
                    side: 'left',
                  });
                }}
              >
                <View style={styles.itemBtnWrapper}>
                  <Image source={profileIcon} style={styles.itemBtnIcon} />
                  <Text style={styles.itemBtnText}>
                    {i18n.gettext('My Profile')}
                  </Text>
                </View>
              </TouchableOpacity>
            }

            {auth.logged &&
              <TouchableOpacity
                style={styles.itemBtn}
                onPress={() => {
                  navigator.handleDeepLink({
                    link: 'orders/',
                    payload: {},
                  });
                  navigator.toggleDrawer({
                    side: 'left',
                  });
                }}
              >
                <View style={styles.itemBtnWrapper}>
                  <Image source={ordersIcon} style={styles.itemBtnIcon} />
                  <Text style={styles.itemBtnText}>
                    {i18n.gettext('Orders')}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.devider} />
          <View style={styles.pagesMenu}>
            {pagesList}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    cart: state.cart,
    pages: state.pages,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
  })
)(Drawer);
