import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';
import { PRODUCT_NUM_COLUMNS } from '../utils';

// Import actions.
import * as vendorActions from '../actions/vendorActions';
import * as productsActions from '../actions/productsActions';

// Components
import Spinner from '../components/Spinner';
import Section from '../components/Section';
import CategoryBlock from '../components/CategoryBlock';
import ProductListView from '../components/ProductListView';

// theme
import theme from '../config/theme';
import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: '50%',
    resizeMode: 'contain',
  },
  vendorWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  vendorTotalItemsText: {
    color: 'gray',
  },
  vendorDetailBtnText: {
    color: '$primaryColor',
    fontSize: '0.9rem',
  }
});

class Vendor extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    vendors: PropTypes.shape({}),
    vendorCategories: PropTypes.shape({}),
    products: PropTypes.shape({}),
    vendorActions: PropTypes.shape({
      categories: PropTypes.func,
      products: PropTypes.func,
      fetch: PropTypes.func,
    }),
    productsActions: PropTypes.shape({
      fetchDiscussion: PropTypes.func,
    }),
    companyId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
    this.isFirstLoad = true;

    this.state = {
      products: [],
      vendor: {
        logo_url: null,
      },
      discussion: {
        search: {
          page: 1,
        }
      },
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { vendors, companyId } = this.props;

    this.props.vendorActions.categories(companyId);
    this.props.vendorActions.products(companyId);

    if (!vendors.items[companyId] && !vendors.fetching) {
      this.props.vendorActions.fetch(companyId);
    } else {
      this.setState({
        vendor: vendors.items[companyId],
      }, () => {
        this.props.productsActions.fetchDiscussion(
          this.state.vendor.company_id,
          { page: this.state.discussion.search.page },
          'M'
        );
      });
    }

    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
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
            title: i18n.gettext('Search'),
            icon: iconsMap.search,
          },
        ],
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { products, vendors, companyId } = nextProps;
    const vendorProducts = products.items[companyId];
    if (vendorProducts) {
      this.setState({
        products: vendorProducts,
      }, () => {
        this.isFirstLoad = false;
      });
    }

    if (vendors.items[companyId]) {
      this.setState({
        vendor: vendors.items[companyId],
      });
    }
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      } else if (event.id === 'search') {
        navigator.showModal({
          screen: 'Search',
          title: i18n.gettext('Search'),
        });
      }
    }
  }

  handleLoadMore() {
    const { products, vendorActions } = this.props;
    if (products.hasMore && !products.fetching && !this.isFirstLoad) {
      vendorActions.products(
        this.props.companyId,
        products.params.page + 1,
      );
    }
  }

  renderHeader() {
    const {
      navigator, vendorCategories, companyId, products
    } = this.props;
    const { vendor } = this.state;

    if (!vendor.logo_url) {
      return null;
    }

    return (
      <View>
        <Section containerStyle={{ paddingTop: 0 }} wrapperStyle={{ padding: 0 }}>
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: vendor.logo_url }}
              style={styles.logo}
            />
          </View>
          <View style={styles.vendorWrapper}>
            <Text style={styles.vendorTotalItemsText}>
              {i18n.gettext('Products found: {{count}}').replace('{{count}}', products.params.total_items)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigator.showModal({
                  screen: 'VendorDetail',
                  passProps: {
                    vendorId: companyId,
                  },
                });
              }}
            >
              <Text style={styles.vendorDetailBtnText}>
                {i18n.gettext('View Detail')}
              </Text>
            </TouchableOpacity>
          </View>
        </Section>
        <CategoryBlock
          items={vendorCategories.items}
          onPress={(category) => {
            navigator.push({
              screen: 'Categories',
              backButtonTitle: '',
              passProps: {
                category,
                companyId,
              }
            });
          }}
        />
      </View>
    );
  }

  render() {
    const { navigator, vendorCategories, vendors } = this.props;

    if (vendorCategories.fetching || vendors.fetching) {
      return (
        <Spinner visible mode="content" />
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          keyExtractor={item => +item.product_id}
          ListHeaderComponent={() => this.renderHeader()}
          numColumns={PRODUCT_NUM_COLUMNS}
          renderItem={item => (<ProductListView
            product={item}
            onPress={product => navigator.push({
              screen: 'ProductDetail',
              backButtonTitle: '',
              passProps: {
                pid: product.product_id,
              }
            })}
          />)}
          onEndReached={() => this.handleLoadMore()}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    vendorCategories: state.vendorCategories,
    products: state.products,
    vendors: state.vendors,
  }),
  dispatch => ({
    vendorActions: bindActionCreators(vendorActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(Vendor);
