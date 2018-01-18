import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as t from 'tcomb-form-native';

// Import actions.
import * as productsActions from '../actions/productsActions';

import Button from '../components/Button';
import Icon from '../components/Icon';
import {
  iconsMap,
  iconsLoaded,
} from '../utils/navIcons';

import theme from '../config/theme';
import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '$screenBackgroundColor',
  },
  textarea: {
    height: 200,
  }
});

const inputStyle = cloneDeep(t.form.Form.stylesheet);
// overriding the text color
inputStyle.textbox.normal.height = 130;

function selectRatingTemplate(rating) {
  const containerStyle = {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 20,
  };
  const checkIcon = {
    color: theme.$ratingStarsColor,
  };

  const stars = [];
  const currentRating = Math.round(rating.value || 0);

  for (let i = 1; i <= currentRating; i += 1) {
    stars.push(
      <TouchableOpacity key={`star_${i}`} onPress={() => rating.onChange(i)}>
        <Icon name="star" style={checkIcon} />
      </TouchableOpacity>
    );
  }

  for (let r = stars.length; r <= 4; r += 1) {
    stars.push(
      <TouchableOpacity key={`star_border_${r}`} onPress={() => rating.onChange(r + 1)}>
        <Icon name="star-border" style={checkIcon} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {stars}
    </View>
  );
}

const Rating = t.enums({
  M: 'Male',
  F: 'Female'
});

const Form = t.form.Form;
const FormFields = t.struct({
  name: t.String,
  rating: Rating,
  message: t.String,
});
const options = {
  disableOrder: true,
  fields: {
    name: {
      label: i18n.gettext('Your name'),
      clearButtonMode: 'while-editing',
    },
    rating: {
      template: selectRatingTemplate,
    },
    message: {
      numberOfLines: 4,
      multiline: true,
      stylesheet: inputStyle,
      label: i18n.gettext('Your message'),
      clearButtonMode: 'while-editing',
    },
  }
};

class WriteReview extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
      dismissModal: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }),
    discussion: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.shape({})),
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

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const { navigator } = this.props;
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
      title: i18n.gettext('Write a Review').toUpperCase(),
    });
  }

  componentWillReceiveProps(nextProps) {

  }

  onNavigatorEvent(event) {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        navigator.dismissModal();
      }
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={FormFields}
          options={options}
        />
        <Button type="primary">
          {i18n.gettext('Send review').toUpperCase()}
        </Button>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    discussion: state.discussion,
  }),
  dispatch => ({
    productsActions: bindActionCreators(productsActions, dispatch),
  })
)(WriteReview);
