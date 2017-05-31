import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import actions.
import * as categoriesActions from '../actions/categoriesActions';
import * as productsActions from '../actions/productsActions';

// Components
import CatalogListView from '../components/CatalogListView';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  category: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdd',
  },
  categoryText: {
    fontSize: '1rem',
  },
  productsListContainer: {
    backgroundColor: 'red',
    padding: 20,
  }
});

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      subCategories: [],
    };
  }

  componentDidMount() {
    const { navigation, productsActions } = this.props;
    const category = navigation.state.params.category;
    InteractionManager.runAfterInteractions(() => {
      if (category.children.length) {
        this.setState({
          subCategories: category.children,
        });
      }
      productsActions.fetchByCategory(category.category_id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    const { products } = nextProps;
    const category = navigation.state.params.category;
    const categoryProducts = products.items[category.category_id];
    if (categoryProducts) {
      this.setState({
        products: categoryProducts,
      });
    }
  }

  renderItem({ item }) {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Category', { category: item })}>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    const productsList = this.state.products.map(p => <View key={p.product_id}>
      <Text>{p.product}</Text>
    </View>);
    return (
      <ScrollView
        horizontal
        style={styles.productsListContainer}
      >
        {productsList}
      </ScrollView>
    );
  }

  renderCategoriesWithProducts() {
    const { categoriesActions, categories } = this.props;
    return (
      <FlatList
        data={this.state.subCategories}
        keyExtractor={item => item.category_id}
        ListHeaderComponent={() => this.renderHeader()}
        renderItem={i => this.renderItem(i)}
        onRefresh={() => categoriesActions.fetch()}
        refreshing={categories.fetching}
      />
    );
  }

  renderProductsList() {
    const { products } = this.props;
    return (
      <Text>Pure products list</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.subCategories.length ?
          this.renderCategoriesWithProducts() :
          this.renderProductsList()
        }
      </View>
    );
  }
}

Categories.navigationOptions = ({ navigation }) => {
  return {
    title: `${navigation.state.params.category.category}`,
  };
};

Categories.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  categories: PropTypes.shape({
    items: PropTypes.array,
    tree: PropTypes.array,
  }),
  products: PropTypes.shape({
    items: PropTypes.object,
  }),
  categoriesActions: PropTypes.shape({
    fetch: PropTypes.func,
  }),
  productsActions: PropTypes.shape({
    fetchByCategory: PropTypes.func,
  })
};

export default connect(state => ({
  nav: state.nav,
  categories: state.categories,
  products: state.products,
}),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    // cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Categories);
