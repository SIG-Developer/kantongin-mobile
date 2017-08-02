import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
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

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import i18n from '../utils/i18n';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

class MainCategory extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
      setButtons: PropTypes.func,
    }),
    categories: PropTypes.shape({
      items: PropTypes.array,
      tree: PropTypes.array,
    }),
    categoriesActions: PropTypes.shape({
      fetch: PropTypes.func,
    })
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: '#989898',
    navBarButtonFontSize: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { navigator, categoriesActions } = this.props;
    categoriesActions.fetch();
    // FIXME: Set title
    navigator.setTitle({
      title: 'CS-Cart'.toUpperCase(),
    });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'sideMenu',
          icon: require('../assets/icons/bars.png'),
        },
      ],
      rightButtons: [
        {
          id: 'cart',
          icon: require('../assets/icons/shopping-cart.png'),
        },
        {
          id: 'search',
          icon: require('../assets/icons/search.png'),
        },
      ],
    });
  }

  componentWillReceiveProps(nextProps) {
    const { categories } = nextProps;
    this.setState({
      items: categories.tree,
    });
  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    registerDrawerDeepLinks(event, navigator);
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideMenu') {
        navigator.toggleDrawer({ side: 'left' });
      } else if (event.id === 'cart') {
        navigator.resetTo({
          screen: 'Cart',
          animated: false,
        });
      } else if (event.id === 'search') {
        navigator.showModal({
          screen: 'Search',
          title: i18n.gettext('Search'),
        });
      }
    }
  }

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  renderList() {
    const { navigator } = this.props;
    return (
      <FlatList
        numColumns={PRODUCT_NUM_COLUMNS}
        data={this.state.items}
        keyExtractor={item => item.category_id}
        ListHeaderComponent={() => (
          <LayoutBlocks
            blocks={blocks}
            location={'mainPageTop'}
            navigation={navigator}
          />
        )}
        renderItem={item => (
          <CategoryListView
            category={item.item}
            index={item.index}
            onPress={() => navigator.push({
              screen: 'Categories',
              backButtonTitle: '',
              passProps: {
                navProps: {
                  category: item.item,
                }
              },
            })}
          />
        )}
        ListFooterComponent={() => (
          <LayoutBlocks
            blocks={blocks}
            location={'mainPageBottom'}
            navigation={navigator}
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

export default connect(state => ({
  categories: state.categories,
}),
  dispatch => ({
    categoriesActions: bindActionCreators(categoriesActions, dispatch),
  })
)(MainCategory);
