import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../components/Button';

const styles = EStyleSheet.create({
  container: {
    margin: 0,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  header: {
    marginBottom: 14,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  }
});

export default class FormBlock extends Component {
  static propTypes = {
    children: PropTypes.shape(),
    buttonText: PropTypes.string,
    title: PropTypes.string,
    simpleView: PropTypes.shape(),
  }

  constructor(props) {
    super(props);

    this.state = {
      showMore: false,
    };
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }

    return (
      <Text style={styles.header}>
        {this.props.title.toUpperCase()}
      </Text>
    );
  }

  renderContent() {
    if (this.props.buttonText && !this.state.showMore) {
      return (
        <View>
          {this.props.simpleView}
          <Button
            onPress={() => {
              this.setState({
                showMore: !this.state.showMore,
              });
            }}
          >
            {this.props.buttonText}
          </Button>
        </View>
      );
    }
    return (
      <View>
        {this.props.children}
      </View>
    );
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.renderTitle()}
        {this.renderContent()}
      </View>
    );
  }
}
