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
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as vendorActions from '../actions/vendorActions';

// Components
import Icon from '../components/Icon';
import Section from '../components/Section';

// theme
import theme from '../config/theme';

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import i18n from '../utils/i18n';

import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

// Styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  logo: {
    height: 60,
    width: 100,
    resizeMode: 'contain',
  },
  vendorName: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  vendorDescription: {
    color: 'gray',
    fontSize: '0.9rem',
    marginTop: 10,
  },
});

export class VendorDetail extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      dismissModal: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    vendorId: PropTypes.string,
    vendors: PropTypes.shape({}),
    vendorActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
  };

  static navigatorStyle = {
    navBarBackgroundColor: theme.$navBarBackgroundColor,
    navBarButtonColor: theme.$navBarButtonColor,
    navBarButtonFontSize: theme.$navBarButtonFontSize,
    navBarTextColor: theme.$navBarTextColor,
    screenBackgroundColor: theme.$screenBackgroundColor,
  };

  constructor(props) {
    super(props);

    this.state = {
      vendor: {},
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator, vendorId, vendors } = this.props;

    if (!vendors.items[vendorId] && !vendors.fetching) {
      this.props.vendorActions.fetch(vendorId);
    } else {
      this.setState({
        vendor: vendors.items[vendorId],
      });
    }

    iconsLoaded.then(() => {
      navigator.setButtons({
        leftButtons: [
          {
            id: 'close',
            icon: iconsMap.close,
          },
        ],
      });
    });

    navigator.setTitle({
      title: i18n.gettext('Vendor Detail').toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      vendor: nextProps.vendors.items[nextProps.vendorId],
    });
  }

  onNavigatorEvent(event) {
    // handle a deep link
    registerDrawerDeepLinks(event, this.props.navigator);
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      }
    }
  }

  renderLogo() {
    const { vendor } = this.state;
    return (
      <Section>
        <Image
          source={{ uri: vendor.logo_url }}
          style={styles.logo}
        />
      </Section>
    );
  }

  renderDesc() {
    const { vendor } = this.state;
    return (
      <Section>
        <View style={styles.vendorWrapper}>
          <Text style={styles.vendorName}>
            {vendor.company}
          </Text>
          <Text style={styles.vendorDescription}>
            {vendor.description}
          </Text>
        </View>
      </Section>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderLogo()}
        {this.renderDesc()}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    vendors: state.vendors,
  }),
  dispatch => ({
    vendorActions: bindActionCreators(vendorActions, dispatch),
  })
)(VendorDetail);
