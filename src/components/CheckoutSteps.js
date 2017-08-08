import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';

const styles = EStyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    flexDirection: 'row',
    height: 30,
    marginLeft: -14,
    marginRight: -14,
  },
  checkIcon: {
    height: 24,
    width: 24,
    marginTop: -2,
    opacity: 0.4,
  },
  stepContainer: {
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
  },
  arrowTop: {
    borderRightWidth: 1,
    borderRightColor: '#D6D6D6',
    height: 24,
    right: 0,
    position: 'absolute',
    top: -16,
    transform: [
      { rotate: '-30deg' },
    ],
  },
  arrowBottom: {
    borderRightWidth: 1,
    borderRightColor: '#D6D6D6',
    height: 26,
    right: 0,
    position: 'absolute',
    bottom: -2,
    transform: [
      { rotate: '30deg' },
    ],
  },
  roundNumber: {
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
    marginRight: 8,
  },
  roundNumberText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: '0.8rem',
  },
  roundNumberGray: {
    backgroundColor: '#989898',
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
        i18n.gettext('Login'),
        i18n.gettext('Delivery'),
        i18n.gettext('Shipping'),
        i18n.gettext('Billing'),
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
        <View style={styles.stepContainer} key={i}>
          <View style={styles.arrowTop} />
          <View style={styles.arrowBottom} />
          <View style={styles.stepContent}>
            <Image source={require('../assets/icons/check-circle-o.png')} style={styles.checkIcon} />
          </View>
        </View>
      );
    }
    return stepsList;
  }

  renderActiveStep() {
    const activeStep = this.state.steps[this.state.stepId];
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepContent}>
          <View style={styles.roundNumber}>
            <Text style={styles.roundNumberText}>
              {this.state.stepId + 1}
            </Text>
          </View>
          <Text>
            {activeStep}
          </Text>
        </View>
        <View style={styles.arrowTop} />
        <View style={styles.arrowBottom} />
      </View>
    );
  }

  renderNextSteps() {
    const { stepId, steps } = this.state;
    const stepsList = [];
    for (let i = (stepId + 1); i < steps.length; i += 1) {
      stepsList.push(
        <View style={styles.stepContainer} key={i}>
          <View style={styles.stepContent}>
            <View style={[styles.roundNumber, styles.roundNumberGray]}>
              <Text style={styles.roundNumberText}>
                {i + 1}
              </Text>
            </View>
          </View>
          <View style={styles.arrowTop} />
          <View style={styles.arrowBottom} />
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
