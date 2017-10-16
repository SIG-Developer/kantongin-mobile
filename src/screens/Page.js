import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  WebView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// Import actions.
import * as notificationsActions from '../actions/notificationsActions';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$screenBackgroundColor',
  },
});

class Page extends Component {
  static propTypes = {
    uri: PropTypes.string,
  };

  render() {
    const { uri } = this.props;
    console.log(uri);
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          userAgent="Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36"
          source={{
            uri,
          }}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    notificationsActions: bindActionCreators(notificationsActions, dispatch),
  })
)(Page);
