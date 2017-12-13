import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_NUM_COLUMNS } from '../utils';
import i18n from '../utils/i18n';
import { BLOCK_CATEGORIES } from '../constants';

// Import actions.
import * as productsActions from '../actions/productsActions';

// Components
import CategoryBlock from '../components/CategoryBlock';
import ProductListView from '../components/ProductListView';
import Spinner from '../components/Spinner';

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
  }
});

class Categories extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    cid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.shape({}),
    products: PropTypes.shape({
      items: PropTypes.object,
    }),
    layouts: PropTypes.shape({
      blocks: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    productsActions: PropTypes.shape({
      fetchByCategory: PropTypes.func,
    })
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
    this.activeCategoryId = 0;
    this.isFirstLoad = true;

    this.state = {
      products: [],
      subCategories: [],
      refreshing: false,
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    iconsLoaded.then(() => {
      this.props.navigator.setButtons({
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

  componentDidMount() {
    const {
      productsActions, products, navigator, cid,
    } = this.props;

    let category = { ...this.props.category };

    if (cid) {
      const categories = this.props.layouts.blocks.find(b => b.type === BLOCK_CATEGORIES);
      const items = Object.keys(categories.content.items).map(k => categories.content.items[k]);
      category = this.findCategoryById(items);
    }
    this.activeCategoryId = category.category_id;
    const categoryProducts = products.items[this.activeCategoryId];
    const newState = {};

    if ('subcategories' in category && category.subcategories.length) {
      newState.subCategories = category.subcategories;
    }

    if (categoryProducts) {
      newState.refreshing = false;
      newState.products = categoryProducts;
    }

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        ...this.state,
        ...newState,
      }, () => productsActions.fetchByCategory(this.activeCategoryId));
    });

    navigator.setTitle({
      title: category.category.toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { products } = nextProps;
    const categoryProducts = products.items[this.activeCategoryId];
    if (categoryProducts) {
      this.setState({
        products: categoryProducts,
        refreshing: false,
      });
      this.isFirstLoad = false;
    }
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'search') {
        navigator.showModal({
          screen: 'Search',
          title: i18n.gettext('Search'),
        });
      }
    }
  }

  findCategoryById(items) {
    const flatten = [];
    const makeFlat = (list) => {
      list.forEach((i) => {
        flatten.push(i);
        if ('subcategories' in i) {
          makeFlat(i.subcategories);
        }
      });
    };
    makeFlat(items);
    return flatten.find(i => i.category_id == this.props.cid) || null;
  }

  handleLoadMore() {
    const { products, productsActions } = this.props;
    if (products.hasMore && !products.fetching && !this.isFirstLoad) {
      productsActions.fetchByCategory(this.activeCategoryId, products.params.page + 1);
    }
  }

  handleRefresh() {
    const { productsActions } = this.props;
    this.setState({
      refreshing: true,
    }, () => productsActions.fetchByCategory(this.activeCategoryId, 1));
  }

  renderHeader() {
    const { navigator } = this.props;
    const productHeader = (
      <Text style={styles.header}>
        {i18n.gettext('Products')}
        {i18n.gettext('')}
      </Text>
    );
    return (
      <View>
        <CategoryBlock
          items={this.state.subCategories}
          onPress={(category) => {
            navigator.push({
              screen: 'Categories',
              backButtonTitle: '',
              passProps: {
                category,
              }
            });
          }}
        />
        {this.state.subCategories.length !== 0 && productHeader}
      </View>
    );
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  renderList() {
    const { navigator } = this.props;
    return (
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
        onRefresh={() => this.handleRefresh()}
        refreshing={this.state.refreshing}
        onEndReachedThreshold={-1}
        onEndReached={() => this.handleLoadMore()}
      />
    );
  }

  render() {
    const { products } = this.props;
    return (
      <View style={styles.container}>
        {
          (products.fetching && this.isFirstLoad) ?
            this.renderSpinner() :
            this.renderList()
        }
      </View>
    );
  }
}

export default connect(
  state => ({
    products: state.products,
    layouts: state.layouts,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(Categories);
