import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    height: 30,
  },
  checkIcon: {
    height: 20,
    width: 20,
  },
  arrowTop: {
    borderRightWidth: 1,
    borderRightColor: 'red',
    height: 20,
    position: 'absolute',
    top: 0,
    transform: [
      { rotate: '20deg' },
    ],
  }
});

export default class extends Component {
  static propTypes = {
    step: PropTypes.number,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      stepId: 0,
      steps: [
        'Login',
        'Delivery',
        'Step 2',
        'Step 3',
      ],
    };
  }

  componentDidMount() {
    this.setState({
      stepId: this.props.step,
    });
  }

  renderPassedSteps() {
    const { stepId, steps } = this.state;
    const stepsList = [];
    for (let i = 0; i < steps.length; i += 1) {
      if (i === stepId) {
        break;
      }
      stepsList.push(
        <View key={i}>
          <Image source={require('../assets/icons/check-circle-o.png')} style={styles.checkIcon} />
          <View style={styles.arrowTop} />
          <View style={styles.arrowBottom} />
        </View>
      );
    }
    return stepsList;
  }

  renderActiveStep() {
    const activeStep = this.state.steps[this.state.stepId];
    return (
      <View>
        <Text>
          {activeStep} - {this.state.stepId + 1}
        </Text>
      </View>
    );
  }

  renderNextSteps() {
    const { stepId, steps } = this.state;
    const stepsList = [];
    for (let i = (stepId + 1); i < steps.length; i += 1) {
      stepsList.push(
        <View key={i}>
          <Text>Passed</Text>
        </View>
      );
    }
    return stepsList;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPassedSteps()}
        {this.renderActiveStep()}
        {this.renderNextSteps()}
      </View>
    );
  }
}
