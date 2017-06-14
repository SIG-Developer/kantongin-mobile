import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

// Import actions.
import * as flashActions from '../actions/flashActions';
import * as productsActions from '../actions/productsActions';

// Components
import Picker from '../components/Picker';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  descriptionBlock: {
    marginTop: 10,
    paddingTop: 10,
    marginLeft: 14,
    marginRight: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1'
  },
  nameText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  priceText: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'black',
  },
  promoText: {
    marginBottom: 10,
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    marginTop: 14,
    paddingTop: 10,
  }
});

class ProductOptions extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.Object,
    }),
    products: PropTypes.shape({
    }),
    productsActions: PropTypes.shape({
      fetchOptions: PropTypes.func,
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      product: {},
      images: [],
    };
  }

  componentDidMount() {
    const { navigation, productsActions } = this.props;
  }

  componentWillReceiveProps(nextProps) {
  }

  renderOptionItem(item) {
    switch (item.option_type) {
      case 'S':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            
          </View>
        );

      case 'R':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            <Text>RadioGroup</Text>
          </View>
        );

      case 'C':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            <Text>Checkbox</Text>
          </View>
        );

      case 'I':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            <Text>Text</Text>
          </View>
        );

      case 'T':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            <Text>Text area</Text>
          </View>
        );

      case 'F':
        return (
          <View key={item.option_id}>
            <Text>{item.option_name}</Text>
            <Text>File</Text>
          </View>
        );
      default:
        return null;
    }
  }

  renderOptions() {
    const { product } = this.state;
    if (!product.options) {
      return null;
    }
    return (
      <View style={styles.options}>
        {product.options.map(o => this.renderOptionItem(o))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Options</Text>
      </View>
    );
  }
}

ProductOptions.navigationOptions = ({ navigation }) => {
  return {
    title: `Product`.toUpperCase(),
  };
};

export default connect(state => ({
  nav: state.nav,
  flash: state.flash,
  products: state.products,
  categories: state.categories,
}),
  dispatch => ({
    flashActions: bindActionCreators(flashActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(ProductOptions);
