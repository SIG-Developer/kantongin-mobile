import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$grayColor',
    paddingTop: 20,
  },
  wrapper: {
    backgroundColor: '#fff',
    padding: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  title: {
    fontSize: '1rem',
    paddingLeft: 14,
    paddingBottom: 10,
  },
});


const Section = ({ children, title = '' }) => {
  return (
    <View
      style={styles.container}
    >
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.wrapper}>
        {children}
      </View>
    </View>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default Section;
