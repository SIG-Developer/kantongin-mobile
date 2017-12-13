import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import i18n from '../utils/i18n';

// Component
import Icon from '../components/Icon';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginLeft: -14,
    marginRight: -14,
    marginTop: -14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  checkIcon: {
    height: 27,
    width: 27,
    marginLeft: 4,
    marginRight: 4,
    opacity: 0.4,
  },
  stepContainer: {
    position: 'relative',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
    height: 30,
  },
  arrowContainer: {
    height: 50,
    width: 20,
    right: 0,
    top: -12,
    position: 'absolute',
  },
  arrowTop: {
    borderRightWidth: 1,
    borderRightColor: '#D6D6D6',
    height: 30,
    right: 0,
    position: 'absolute',
    top: -0,
    transform: [
      { rotate: '-30deg' },
    ],
  },
  arrowBottom: {
    borderRightWidth: 1,
    borderRightColor: '#D6D6D6',
    height: 30,
    right: 0,
    position: 'absolute',
    bottom: -6,
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
    marginRight: 6,
  },
  roundNumberText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: '0.8rem',
  },
  roundNumberGray: {
    backgroundColor: '#989898',
    marginLeft: 6,
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
        i18n.gettext('Authentication'),
        i18n.gettext('Delivery'),
        i18n.gettext('Shipping'),
        i18n.gettext('Payment method'),
      ],
    };
  }

  componentDidMount() {
    this.setState({
      stepId: this.props.step,
    });
  }

  renderArrow = () => (
    <View style={styles.arrowContainer}>
      <View style={styles.arrowTop} />
      <View style={styles.arrowBottom} />
    </View>
  );

  renderPassedSteps() {
    const { stepId, steps } = this.state;
    const stepsList = [];
    for (let i = 0; i < steps.length; i += 1) {
      if (i === stepId) {
        break;
      }
      stepsList.push(
        <View style={styles.stepContainer} key={i}>
          <View style={styles.stepContent}>
            <Icon name="check" style={styles.checkIcon} />
          </View>
          {this.renderArrow()}
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
        {this.renderArrow()}
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
          {this.renderArrow()}
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
