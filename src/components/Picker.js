import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Picker,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 48,
    backgroundColor: '#f55e5e',
  },
  msgText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '1rem',
  }
});

export default class extends Component {
  static propTypes = {
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      visible: false,
    };
  }

  componentDidMount() {
    const { value, visible } = this.props;
    this.setState({
      value,
      visible,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value, visible } = nextProps;
    this.setState({
      value,
      visible,
    });
  }

  handleChange(itemValue, itemIndex) {
    this.setState({ value: itemValue });
  }

  render() {
    const pickerItems = this.props.items.map(i => (
      <Picker.Item label={i.label} value={i.value} key={i.value} />
    ));
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.visible}
        transparent
      >
        <View style={styles.container}>
          <Picker
            selectedValue={this.state.value}
            onValueChange={(itemValue, itemIndex) => this.handleChange(itemValue, itemIndex)}
          >
            {pickerItems}
          </Picker>
        </View>
      </Modal>
    );
  }
}
