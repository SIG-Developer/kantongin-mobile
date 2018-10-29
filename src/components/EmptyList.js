import React from 'react';
// import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    marginTop: 30,
  },
  header: {
    fontSize: '1rem',
    color: 'gray',
    textAlign: 'center'
  }
});

const EmptyList = () => (
  <View style={styles.container}>
    <Text style={styles.header}>
      {i18n.gettext('List is empty')}.
    </Text>
  </View>
);

export default EmptyList;
