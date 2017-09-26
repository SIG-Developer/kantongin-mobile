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

// Import actions.
import * as categoriesActions from '../actions/categoriesActions';
import * as productsActions from '../actions/productsActions';

// Components
import CategoryListView from '../components/CategoryListView';
import ProductListView from '../components/ProductListView';
import Spinner from '../components/Spinner';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  subCategoriesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  header: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '1.6rem',
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 20,
  }
});

const searchImage = require('../assets/icons/search.png');

class Categories extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    category: PropTypes.shape({}),
    products: PropTypes.shape({
      items: PropTypes.object,
    }),
    productsActions: PropTypes.shape({
      fetchByCategory: PropTypes.func,
    })
  };

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'cart',
        component: 'CartBtn',
      },
      {
        id: 'search',
        title: i18n.gettext('Search'),
        icon: searchImage,
      },
    ]
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

  componentDidMount() {
    const { productsActions, products, category, navigator } = this.props;
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
    const subCategoriesList = this.state.subCategories.map((item, index) => (<CategoryListView
      key={index}
      category={item}
      index={index}
      onPress={() => navigator.push({
        screen: 'Categories',
        backButtonTitle: '',
        passProps: {
          category: item,
        },
      })}
    />));
    const productHeader = (
      <Text style={styles.header}>
        {i18n.gettext('Products')}
        {i18n.gettext('')}
      </Text>
    );
    return (
      <View>
        <View style={styles.subCategoriesContainer}>
          {subCategoriesList}
        </View>
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
              navProps: {
                pid: product.product_id,
              }
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

export default connect(state => ({
  categories: state.categories,
  products: state.products,
}),
dispatch => ({
  productsActions: bindActionCreators(productsActions, dispatch),
  categoriesActions: bindActionCreators(categoriesActions, dispatch),
})
)(Categories);
