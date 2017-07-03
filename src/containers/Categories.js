import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PRODUCT_NUM_COLUMNS } from '../utils';

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
    backgroundColor: '#FFF',
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

class Categories extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    products: PropTypes.shape({
      items: PropTypes.object,
    }),
    productsActions: PropTypes.shape({
      fetchByCategory: PropTypes.func,
    })
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
  }

  componentDidMount() {
    const { navigation, productsActions, products } = this.props;
    const category = navigation.state.params.category;
    this.activeCategoryId = category.category_id;
    const categoryProducts = products.items[this.activeCategoryId];
    const newState = {};
    if (category.children.length) {
      newState.subCategories = category.children;
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
    const { navigation } = this.props;
    const subCategoriesList = this.state.subCategories.map((item, index) => (<CategoryListView
      key={index}
      category={item}
      index={index}
      onPress={() => navigation.navigate('Category', { category: item })}
    />));
    const productHeader = (<Text style={styles.header}>Products</Text>);
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
    const { navigation } = this.props;
    return (
      <FlatList
        data={this.state.products}
        keyExtractor={item => +item.product_id}
        ListHeaderComponent={() => this.renderHeader()}
        numColumns={PRODUCT_NUM_COLUMNS}
        renderItem={item => (<ProductListView
          product={item}
          onPress={product => navigation.navigate('ProductDetail', {
            pid: product.product_id,
          })}
        />)}
        onRefresh={() => this.handleRefresh()}
        refreshing={this.state.refreshing}
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

Categories.navigationOptions = ({ navigation }) => {
  return {
    title: `${navigation.state.params.category.category}`.toUpperCase(),
    mode: 'modal',
  };
};

export default connect(state => ({
  nav: state.nav,
  categories: state.categories,
  products: state.products,
}),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
  })
)(Categories);
