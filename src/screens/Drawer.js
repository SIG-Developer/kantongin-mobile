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

// Components
import Icon from '../components/Icon';

import theme from '../config/theme';
import config from '../config';
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
    backgroundColor: '$drawerHeaderBackgroundColor',
    height: '10rem',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '$drawerHeaderBorderColor'
  },
  headerUserName: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  headerUserNameText: {
    color: '$drawerHeaderTextColor',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  headerUserMailText: {
    fontSize: '0.8rem',
    color: '$drawerHeaderTextColor',
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
  },
  signInDelim: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  signInWrapper: {
    position: 'absolute',
    padding: 12,
    bottom: 14,
    left: 14,
    flex: 1,
    flexDirection: 'row',
  },
  signInBtnText: {
    textAlign: 'left',
    color: '$drawerHeaderTextColor',
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
    fontSize: 28,
    marginRight: 20,
    color: '$drawerHeaderButtonColor',
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
    backgroundColor: '$drawerPrimaryBadgeColor',
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
    backgroundColor: '$drawerSecondaryBadgeColor',
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
    fontSize: 28,
    color: '$navBarButtonColor',
  },
  devider: {
    borderBottomWidth: 1,
    borderColor: '$drawerHeaderBackgroundColor',
    marginTop: 14,
    marginBottom: 14,
  }
});

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
    wishList: PropTypes.shape({
      items: PropTypes.array,
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
    this.props.pagesActions.fetch(config.layoutId);
  }

  handleOpenPage = (page) => {
    this.props.navigator.handleDeepLink({
      link: `dispatch=pages.view&page_id=${page.page_id}`,
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
            <Icon name="exit-to-app" style={styles.signOutBtnIcon} />
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
        <View style={styles.signInWrapper}>
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
              {i18n.gettext('Login')}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.signInBtnText, styles.signInDelim]}>
            {i18n.gettext('|')}
          </Text>

          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => {
              this.props.navigator.toggleDrawer({
                side: 'left',
              });
              this.props.navigator.showModal({
                screen: 'Registration',
                passProps: {
                  showClose: true,
                },
              });
            }}
          >
            <Text style={styles.signInBtnText}>
              {i18n.gettext('Registration')}
            </Text>
          </TouchableOpacity>
        </View>
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
                <Icon name="home" style={styles.itemBtnIcon} />
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
                <Icon name="shopping-cart" style={styles.itemBtnIcon} />
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
                  navigator.showModal({
                    screen: 'WishList',
                  });
                  navigator.toggleDrawer({
                    side: 'left',
                  });
                }}
              >
                <View style={styles.itemBtnWrapper}>
                  <Icon name="favorite" style={styles.itemBtnIcon} />
                  <Text style={styles.itemBtnText}>
                    {i18n.gettext('Wish List')}
                  </Text>
                  {this.renderBadge(this.props.wishList.items.length)}
                </View>
              </TouchableOpacity>
            }

            {auth.logged &&
              <TouchableOpacity
                style={styles.itemBtn}
                onPress={() => {
                  navigator.handleDeepLink({
                    link: 'dispatch=profiles.update',
                    payload: {},
                  });
                  navigator.toggleDrawer({
                    side: 'left',
                  });
                }}
              >
                <View style={styles.itemBtnWrapper}>
                  <Icon name="person" style={styles.itemBtnIcon} />
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
                    link: 'dispatch=orders.search',
                    payload: {},
                  });
                  navigator.toggleDrawer({
                    side: 'left',
                  });
                }}
              >
                <View style={styles.itemBtnWrapper}>
                  <Icon name="receipt" style={styles.itemBtnIcon} />
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
    wishList: state.wishList,
    pages: state.pages,
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    pagesActions: bindActionCreators(pagesActions, dispatch),
  })
)(Drawer);
