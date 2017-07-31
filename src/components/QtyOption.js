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
    marginBottom: 14,
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  btnGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  btn: {
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    backgroundColor: 'transparent',
    color: '#989898',
    fontSize: '1.4rem',
    marginTop: -4,
    marginRight: -1,
  },
  valueText: {
    color: '#989898',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: 36,
    textAlign: 'center',
  }
});

export default class extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    noTitle: PropTypes.bool,
  };

  static defaultProps = {
    value: 1,
    noTitle: false,
    onChange() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
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
    const { value, noTitle } = this.state;
    return (
      <View style={styles.container}>
        {noTitle && <Text style={styles.title}>Quantity</Text>}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if ((value - 1) !== 0) {
                this.handleChange(value - 1);
              }
            }}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.valueText}>{value}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleChange(value + 1)}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
