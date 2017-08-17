import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as shippingActions from '../actions/shippingActions';

// Components
import CheckoutSteps from '../components/CheckoutSteps';
import Spinner from '../components/Spinner';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contentContainer: {
    padding: 14,
  },
  shippingItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  }
});

class CheckoutStepTwo extends Component {
  static propTypes = {
    shippingActions: PropTypes.shape({
      fetchAll: PropTypes.func,
    }),
    shippings: PropTypes.shape({
      fetching: PropTypes.bool,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    navigator: PropTypes.shape({
      setButtons: PropTypes.func,
    })
  };

  static navigatorStyle = {
    navBarBackgroundColor: '#FAFAFA',
    navBarButtonColor: 'black',
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      fetching: false,
    };
  }

  componentDidMount() {
    const { shippingActions, navigator } = this.props;
    InteractionManager.runAfterInteractions(() => {
      shippingActions.fetchAll();
    });
    navigator.setButtons({
      rightButtons: [
        {
          title: i18n.gettext('Next'),
          id: 'next',
          buttonColor: '#FD542A',
          buttonFontWeight: '600',
          buttonFontSize: 16,
        },
      ],
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.shippings.items,
      fetching: nextProps.shippings.fetching,
    });
  }

  renderList() {
    return (
      <View style={{ flex: 1, }}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={this.state.items}
          keyExtractor={item => +item.shipping_id}
          numColumns={1}
          ListHeaderComponent={() => <CheckoutSteps step={2} />}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }

  renderItem = (item) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.shippingItem}
        onPress={() => navigation.push('CheckoutStepThree', {
          ...navigation.state.params,
          shipping_id: item.shipping_id,
        })}
      >
        <Text style={styles.shippingItemText}>
          {item.shipping} {item.delivery_time}
        </Text>
      </TouchableOpacity>
    );
  };

  renderSpinner = () => (
    <Spinner visible mode="content" />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.fetching ? this.renderSpinner() : this.renderList()}
      </View>
    );
  }
}

export default connect(state => ({
  shippings: state.shippings,
}),
dispatch => ({
  shippingActions: bindActionCreators(shippingActions, dispatch),
})
)(CheckoutStepTwo);
