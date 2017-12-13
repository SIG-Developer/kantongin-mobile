import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import debounce from 'lodash/debounce';

// Import actions.
import * as productsActions from '../actions/productsActions';
import i18n from '../utils/i18n';

// Components
import ProductListView from '../components/ProductListView';
import Spinner from '../components/Spinner';
import Icon from '../components/Icon';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
    // backgroundColor: 'red',
  },
  topSearch: {
    backgroundColor: '#FAFAFA',
    height: (Platform.OS === 'ios') ? 80 : 60,
    padding: 14,
    paddingTop: (Platform.OS === 'ios') ? 30 : 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    flex: 2,
    fontSize: '0.9rem',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  inputAndroid: {
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 2,
  },
  btnClose: {
    padding: 10,
    marginLeft: -14,
  },
  btnCloseImg: {
    opacity: 0.5,
    marginTop: -4,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    marginTop: 80,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#989898',
  }
});

class Search extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      dismissModal: PropTypes.func,
    }),
    productsActions: PropTypes.shape({
      search: PropTypes.func,
    }),
    search: PropTypes.shape({}),
  };

  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: '#FAFAFA',
  };

  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { search } = nextProps;
    this.setState({
      products: search.items,
    });
  }

  handleInputChange(t) {
    if (t.length < 2) {
      return;
    }
    this.props.productsActions.search({
      q: t,
    });
  }

  renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{i18n.gettext('List is empty')}</Text>
    </View>
  );

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topSearch}>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => navigator.dismissModal()}
          >
            <Icon name="close" style={styles.btnCloseImg} />
          </TouchableOpacity>
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={debounce(t => this.handleInputChange(t), 600)}
            style={(Platform.os === 'ios') ? styles.input : styles.inputAndroid}
            clearButtonMode="while-editing"
            placeholder={i18n.gettext('Search')}
          />
        </View>
        <View style={styles.content}>
          <FlatList
            data={this.state.products}
            keyExtractor={item => +item.product_id}
            numColumns={2}
            ListEmptyComponent={() => this.renderEmptyList()}
            renderItem={item => (<ProductListView
              product={item}
              onPress={product => navigator.push({
                screen: 'ProductDetail',
                backButtonTitle: '',
                passProps: {
                  pid: product.product_id,
                  hideSearch: true,
                }
              })}
            />)}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    search: state.search,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(Search);
