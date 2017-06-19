import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: '1rem',
  },
  optionsList: {},
  optionsVariants: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  optionsItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 3,
    marginBottom: 6,
    marginRight: 6,
  },
  optionsItemBtnText: {
    color: '#6d90b3',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  optionsItemActive: {
    backgroundColor: '#6d90b3',
  },
});

export default class extends Component {
  static propTypes = {
    value: PropTypes.shape({}),
    option: PropTypes.shape({}).isRequired,
    multiply: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    option: {},
    value: null,
    multiply: false,
    onChange() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {
    const { option, value } = this.props;
    const optionsVariantsList = option.variants.map(v => (
      <TouchableOpacity
        key={v.variant_id}
        style={styles.optionsItem}
        onPress={() => this.handleChange(v)}
      >
        <Text style={styles.optionsItemBtnText}>
          {v.variant_name}
        </Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {option.option_name}:
        </Text>
        <View style={styles.optionsVariants}>
          {optionsVariantsList}
        </View>
      </View>
    );
  }
}
