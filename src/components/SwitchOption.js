import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Switch,
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
  wrapper: {
    marginTop: 10,
  }
});

export default class extends Component {
  static propTypes = {
    value: PropTypes.shape({}),
    option: PropTypes.shape({
      option_name: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: false,
      title: '',
    };
  }

  componentDidMount() {
    const { value, option } = this.props;
    this.setState({
      value: value.variant_name === 'Yes',
      title: option.option_name,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value, option } = nextProps;
    this.setState({
      value: value.variant_name === 'Yes',
      title: option.option_name,
    });
  }

  handleChange(v) {
    const { option } = this.props;
    return this.props.onChange(option.variants[v ? 0 : 1]);
  }

  render() {
    const { value, title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrapper}>
          <Switch
            value={value}
            onValueChange={v => this.handleChange(v)}
          />
        </View>
      </View>
    );
  }
}
