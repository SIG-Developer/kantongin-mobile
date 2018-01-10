import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from './Icon';

const styles = EStyleSheet.create({
  container: {
    padding: 10,
  },
});


const Rating = ({ rating }) => {
  const totalCount = 5;
  return (
    <View
      style={styles.container}
    >
      <Icon name="star" style={styles.checkIcon} />
    </View>
  );
};

Rating.propTypes = {
  value: PropTypes.string,
};

export default Rating;
