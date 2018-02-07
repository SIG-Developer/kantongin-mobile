import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
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
  rightButton: {
    position: 'absolute',
    top: 20,
    right: 14,
  },
  rightButtonText: {
    color: '$primaryColor',
    fontSize: '1rem',
  },
});


const Section = ({
  children, title = '', wrapperStyle, containerStyle, showRightButton, rightButtonText, onRightButtonPress
}) => (
  <View
    style={[styles.container, containerStyle]}
  >
    {title ?
      <Text style={styles.title}>{title}</Text>
      :
      null
    }
    {showRightButton &&
    <TouchableOpacity
      onPress={() => onRightButtonPress()}
      style={styles.rightButton}
    >
      <Text
        style={styles.rightButtonText}
      >
        {rightButtonText}
      </Text>
    </TouchableOpacity>
    }
    <View style={[styles.wrapper, wrapperStyle]}>
      {children}
    </View>
  </View>
);

Section.propTypes = {
  title: PropTypes.string,
  wrapperStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  containerStyle: PropTypes.shape({}),
  showRightButton: PropTypes.bool,
  rightButtonText: PropTypes.string,
  onRightButtonPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default Section;
