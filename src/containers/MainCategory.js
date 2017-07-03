import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { blocks } from '../fakeData';
import { PRODUCT_NUM_COLUMNS } from '../utils';

// Import actions.
import * as categoriesActions from '../actions/categoriesActions';

// Components
import CategoryListView from '../components/CategoryListView';
import LayoutBlocks from '../components/LayoutBlocks';
import Spinner from '../components/Spinner';


// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

class MainCategory extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    categories: PropTypes.shape({
      items: PropTypes.array,
      tree: PropTypes.array,
    }),
    categoriesActions: PropTypes.shape({
      fetch: PropTypes.func,
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.props.categoriesActions.fetch();
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = nextProps;
    this.setState({
      items: categories.tree,
    });
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  renderList() {
    const { navigation } = this.props;
    return (
      <FlatList
        numColumns={PRODUCT_NUM_COLUMNS}
        data={this.state.items}
        keyExtractor={item => item.category_id}
        renderItem={item => (
          <CategoryListView
            category={item.item}
            index={item.index}
            onPress={() => navigation.navigate('Category', { category: item.item })}
          />
        )}
        ListFooterComponent={() => (
          <LayoutBlocks
            blocks={blocks}
            location={'mainPage'}
            navigation={navigation}
          />
        )}
      />
    );
  }

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.container}>
        {categories.fetching ? this.renderSpinner() : this.renderList()}
      </View>
    );
  }
}

MainCategory.navigationOptions = () => {
  return {
    title: 'Catalog'.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  categories: state.categories,
}),
  dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
  })
)(MainCategory);
