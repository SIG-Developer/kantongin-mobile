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
import uniqueId from 'lodash';
// Import actions.
import * as vendorActions from '../actions/vendorActions';
import * as productsActions from '../actions/productsActions';

// Components
import Icon from '../components/Icon';
import Section from '../components/Section';
import DiscussionList from '../components/DiscussionList';

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
  address: {
    color: 'gray',
    fontSize: '0.9rem',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 8,
    paddingTop: 8,
  },
  rowNameText: {
    fontWeight: 'bold',
  },
  vendorLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vendorLinkText: {
    fontSize: '0.9rem',
  }
});

export class VendorDetail extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      dismissModal: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    discussion: PropTypes.shape({
      items: PropTypes.shape({}),
    }),
    vendorId: PropTypes.string,
    auth: PropTypes.shape({
      logged: PropTypes.bool,
    }),
    vendors: PropTypes.shape({
      items: PropTypes.shape({}),
    }),
    vendorActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
    productsActions: PropTypes.shape({
      fetchDiscussion: PropTypes.func,
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
      discussion: {
        average_rating: 0,
        posts: [],
        search: {
          page: 1,
          total_items: 0,
        },
      },
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
      }, () => {
        this.props.productsActions.fetchDiscussion(
          this.state.vendor.company_id,
          { page: this.state.discussion.search.page },
          'M'
        );
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
        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: vendor.logo_url }}
            style={styles.logo}
          />
        </View>
      </Section>
    );
  }

  renderVendorProducts = () => (
    <Section>
      <TouchableOpacity style={styles.vendorLink}>
        <Text style={styles.vendorLinkText}>
          {i18n.gettext('View vendor products ({{items}} item(s))').replace('{{items}}', 22)}
        </Text>
        <Icon name="keyboard-arrow-right" style={styles.simpleBtnIcon} />
      </TouchableOpacity>
    </Section>
  );

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

  renderContactItem = (item, value) => {
    if (!value) {
      return null;
    }

    return (
      <View style={styles.rowGroup} key={uniqueId(`value_${value}`)}>
        <View style={styles.rowName}>
          <Text style={styles.rowNameText}>
            {item}
          </Text>
        </View>
        <View style={styles.rowNameValue}>
          <Text style={styles.rowNameValueText}>
            {value}
          </Text>
        </View>
      </View>
    );
  }

  renderContacts() {
    const { vendor } = this.state;
    return (
      <Section title={i18n.gettext('Contact Information')}>
        {this.renderContactItem(i18n.gettext('E-mail'), vendor.contact_information.email)}
        {this.renderContactItem(i18n.gettext('Phone'), vendor.contact_information.phone)}
        {this.renderContactItem(i18n.gettext('Fax'), vendor.contact_information.fax)}
        {this.renderContactItem(i18n.gettext('Website'), vendor.contact_information.url)}
      </Section>
    );
  }

  renderShipping() {
    const { vendor } = this.state;
    return (
      <Section title={i18n.gettext('Shipping address')}>
        <Text style={styles.address}>
          {vendor.shipping_address.address},
        </Text>
        <Text style={styles.address}>
          {vendor.shipping_address.state} {vendor.shipping_address.zipcode},
        </Text>
        <Text style={styles.address}>
          {vendor.shipping_address.country}
        </Text>
      </Section>
    );
  }

  renderDiscussion() {
    const { vendor } = this.state;
    const { auth, navigator, discussion } = this.props;
    // Get active discussion.
    let activeDiscussion = discussion.items[`m_${vendor.company_id}`];
    if (!activeDiscussion) {
      activeDiscussion = {
        average_rating: 0,
        posts: [],
        search: {
          page: 1,
          total_items: 0,
        },
      };
    }

    console.log(activeDiscussion, 'eeee');

    let title = i18n.gettext('Reviews');
    if (activeDiscussion.search.total_items != 0) { // eslint-disable-line
      title = i18n.gettext('Reviews ({{count}})').replace('{{count}}', activeDiscussion.search.total_items);
    }
    return (
      <Section
        title={title}
        wrapperStyle={styles.noPadding}
        showRightButton={discussion.disable_adding || auth.logged}
        rightButtonText={i18n.gettext('Write a Review')}
        onRightButtonPress={() => {
          navigator.push({
            screen: 'WriteReview',
            backButtonTitle: '',
            passProps: {
              type: 'modal',
              activeDiscussion,
            }
          });
        }}
      >
        <DiscussionList
          infinite
          items={discussion.posts}
          type={discussion.type}
        />
      </Section>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderLogo()}
        {this.renderVendorProducts()}
        {this.renderDesc()}
        {this.renderContacts()}
        {this.renderShipping()}
        {this.renderDiscussion()}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    vendors: state.vendors,
    discussion: state.discussion,
  }),
  dispatch => ({
    vendorActions: bindActionCreators(vendorActions, dispatch),
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(VendorDetail);
