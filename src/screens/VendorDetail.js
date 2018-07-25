import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as vendorActions from '../actions/vendorActions';
import * as productsActions from '../actions/productsActions';

// Components
import Rating from '../components/Rating';
import Section from '../components/Section';
import SectionRow from '../components/SectionRow';
import SectionButton from '../components/SectionButton';
import DiscussionList from '../components/DiscussionList';

// theme
import theme from '../config/theme';

// links
import { registerDrawerDeepLinks } from '../utils/deepLinks';
import i18n from '../utils/i18n';
import { stripTags } from '../utils';

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
  noPadding: {
    padding: 0,
    paddingTop: 6,
  },
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
      fetching: PropTypes.bool,
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

    this.requestSent = true;
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
    const {
      navigator, vendorId, vendors
    } = this.props;

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
    // Get active discussion.
    let activeDiscussion = nextProps.discussion.items[`m_${this.state.vendor.company_id}`];
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

    this.setState({
      vendor: nextProps.vendors.items[nextProps.vendorId],
      discussion: activeDiscussion,
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

  handleLoadMore() {
    const { discussion, vendor } = this.state;
    const hasMore = discussion.search.total_items != discussion.posts.length; // eslint-disable-line

    if (hasMore && !this.requestSent && !this.props.discussion.fetching) {
      this.requestSent = true;
      this.props.productsActions.fetchDiscussion(
        vendor.company_id,
        {
          page: discussion.search.page + 1,
        },
        'M'
      );
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

  renderDesc() {
    const { vendor, discussion } = this.state;
    return (
      <Section>
        <View style={styles.vendorWrapper}>
          <Text style={styles.vendorName}>
            {vendor.company}
          </Text>
          <Rating
            value={discussion.average_rating}
            count={discussion.search.total_items}
          />
          <Text style={styles.vendorDescription}>
            {stripTags(vendor.description)}
          </Text>
        </View>
      </Section>
    );
  }

  renderContacts() {
    const { vendor } = this.state;
    return (
      <Section title={i18n.gettext('Contact Information')}>
        <SectionRow
          name={i18n.gettext('E-mail')}
          value={vendor.contact_information.email}
        />
        <SectionRow
          name={i18n.gettext('Phone')}
          value={vendor.contact_information.phone}
        />
        <SectionRow
          name={i18n.gettext('Fax')}
          value={vendor.contact_information.fax}
        />
        <SectionRow
          name={i18n.gettext('Website')}
          value={vendor.contact_information.url}
          last
        />
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
    const { discussion, vendor } = this.state;
    const { auth, navigator } = this.props;

    let title = i18n.gettext('Reviews');
    if (discussion.search.total_items != 0) { // eslint-disable-line
      title = i18n.gettext('Reviews (%1)', discussion.search.total_items);
    }

    return (
      <Section
        title={title}
        wrapperStyle={styles.noPadding}
        showRightButton={!discussion.disable_adding && auth.logged}
        rightButtonText={i18n.gettext('Write a Review')}
        onRightButtonPress={() => {
          navigator.push({
            screen: 'WriteReview',
            backButtonTitle: '',
            passProps: {
              activeDiscussion: discussion,
              discussionType: 'M',
              discussionId: vendor.company_id,
            }
          });
        }}
      >
        <DiscussionList
          infinite
          items={discussion.posts}
          type={discussion.type}
          fetching={this.props.discussion.fetching}
          onEndReached={() => this.handleLoadMore()}
        />
      </Section>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderLogo()}
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
