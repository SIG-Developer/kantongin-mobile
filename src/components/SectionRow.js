import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 8,
    paddingTop: 8,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  nameText: {
    fontWeight: 'bold',
  },
  valueText: {
  },
});

const SectionRow = ({ name, value, last = false }) => (
  <View style={[styles.row, last && styles.lastRow]}>
    <View style={styles.name}>
      <Text style={styles.nameText}>
        {name}
      </Text>
    </View>
    <View style={styles.value}>
      <Text style={styles.valueText}>
        {value}
      </Text>
    </View>
  </View>
);

SectionRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  last: PropTypes.bool,
};

export default SectionRow;
