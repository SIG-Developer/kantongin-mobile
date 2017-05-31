import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
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
    // console.log(category);
    if (category.children.length) {
      setTimeout(() => this.setState({ subCategories: category.children }), 200);
    }
    if (+category.product_count) {
      productsActions.fetchByCategory(category.category_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    // const { categories } = nextProps;
    // this.setState({
    //   items: categories.tree,
    // });
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
    return (
      <View style={{}}>
        <Text>Header</Text>
      </View>
    );
  }

  render() {
    const { categoriesActions, categories } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.subCategories}
          keyExtractor={item => item.category_id}
          ListHeaderComponent={() => this.renderHeader()}
          renderItem={i => this.renderItem(i)}
          onRefresh={() => categoriesActions.fetch()}
          refreshing={categories.fetching}
        />
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
}),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
    // cartActions: bindActionCreators(cartActions, dispatch),
  })
)(Categories);
