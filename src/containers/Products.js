import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Modal,
  Text,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as productsActions from '../actions/productsActions';
import * as categoriesActions from '../actions/categoriesActions';
import * as cartActions from '../actions/cartActions';

// Components
import ProductListView from '../components/ProductListView';
import ProductDetail from '../components/ProductDetail';
import ProductFilter from '../components/ProductFilter';
import CategoriesNav from '../components/CategoriesNav';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  }
});

class Catalog extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerTitle = navigation.state.params.category.category;
    return {
      headerTitle,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'All products',
      activeProduct: {},
      productModalVisible: false,
      filterModalVisible: false,
      category: {},
    };
  }

  componentDidMount() {
    const { navigation, productsActions } = this.props;
    const category = navigation.state.params.category;

    InteractionManager.runAfterInteractions(() => {
      this.setState({ category });
      productsActions.fetchByCategory(category.category_id);
    });
  }

  handleLoadMore() {
    const { products, productsActions } = this.props;
    if (products.hasMore) {
      productsActions.fetch(products.params.page + 1);
    }
  }

  handleRefresh() {
    const { productsActions } = this.props;
    productsActions.fetchByCategory(this.state.category.category_id, 0);
  }

  render() {
    const { products, navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={products.items}
          onEndReached={() => this.handleLoadMore()}
          onRefresh={() => this.handleRefresh()}
          refreshing={products.fetching}
          numColumns={2}
          keyExtractor={item => item.product_id}
          renderItem={item =>
            <ProductListView
              product={item}
              onPress={activeProduct => this.setState({ productModalVisible: true, activeProduct, })}
            />
          }
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.productModalVisible}
        >
          <ProductDetail
            product={this.state.activeProduct}
            onClose={() => this.setState({ productModalVisible: false })}
            onAddToCart={p => cartActions.addToCart(p)}
          />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.filterModalVisible}
        >
          <ProductFilter
            onClose={() => this.setState({ filterModalVisible: false })}
          />
        </Modal>
      </View>
    );
  }
}

Catalog.propTypes = {
  navigation: PropTypes.shape({}),
  products: PropTypes.shape({
    items: PropTypes.array,
    hasMore: PropTypes.boolean,
  }),
  productsActions: PropTypes.shape({
    fetchByCategory: PropTypes.func,
  })
};

export default connect(state => ({
  nav: state.nav,
  products: state.products,
  cart: state.cart,
}),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Catalog);
