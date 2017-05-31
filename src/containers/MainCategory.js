import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as categoriesActions from '../actions/categoriesActions';

// Components
import CatalogListView from '../components/CatalogListView';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

class MainCategory extends Component {
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          keyExtractor={item => item.category_id}
          numColumns={2}
          renderItem={item => (
            <CatalogListView
              category={item}
              onPress={() => navigation.navigate('Category', { category: item.item })}
            />
          )}
        />
      </View>
    );
  }
}

MainCategory.navigationOptions = () => {
  return {
    title: 'Catalog',
  };
};

MainCategory.propTypes = {
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
};

export default connect(state => ({
  nav: state.nav,
  categories: state.categories,
}),
  dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
  })
)(MainCategory);
