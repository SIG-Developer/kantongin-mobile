import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
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
  commentText: {
    color: '#9cb0c4',
    marginTop: 3,
  },
  input: {
    fontSize: '0.9rem',
    height: 60,
    borderColor: '#EEEEEE',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: 8,
    padding: 8,
  }
});

export default class extends Component {
  static propTypes = {
    value: PropTypes.string,
    option: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    option: {},
    value: '',
    onChange() {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
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

  renderComment = (option) => {
    if (option.comment) {
      return (<Text style={styles.commentText}>{option.comment}</Text>);
    }
    return null;
  };

  render() {
    const { option } = this.props;
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {option.option_name}
        </Text>
        <View style={styles.optionsVariants}>
          <TextInput
            multiline
            value={value}
            style={styles.input}
            autoCapitalize={'none'}
            keyboardAppearance={'dark'}
            clearButtonMode={'while-editing'}
            onChangeText={text => this.handleChange(text)}
          />
        </View>
        {this.renderComment(option)}
      </View>
    );
  }
}
