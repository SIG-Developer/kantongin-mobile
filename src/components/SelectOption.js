import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
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
  titleSub: {
    fontWeight: 'normal',
    color: 'gray',
  },
  optionsList: {},
  optionsVariants: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionsItem: {
    padding: 8,
    borderWidth: 2,
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
  optionsItemBtnTextActive: {
    color: '#ff5319',
  },
  optionsItemActive: {
    borderColor: '#ff5319',
  },
  optionImage: {
    height: 70,
    width: 70,
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
    const { option } = this.props;
    const { value } = this.state;

    if (!value || !option) {
      return null;
    }

    const optionsVariantsList = option.variants.map((v) => {
      const active = value.variant_id === v.variant_id;
      let img = null;
      if ('icon' in v.image_pair) {
        img = v.image_pair.icon.http_image_path;
      }
      let content = (
        <Text
          style={[styles.optionsItemBtnText, active && styles.optionsItemBtnTextActive]}
        >
          {v.variant_name}
        </Text>
      );
      if (img) {
        content = (
          <Image source={{ uri: img }} style={styles.optionImage} />
        );
      }
      return (
        <TouchableOpacity
          key={v.variant_id}
          style={[styles.optionsItem, active && styles.optionsItemActive]}
          onPress={() => this.handleChange(v)}
        >
          {content}
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {option.option_name}: <Text style={styles.titleSub}>{value.variant_name}</Text>
        </Text>
        <View style={styles.optionsVariants}>
          {optionsVariantsList}
        </View>
      </View>
    );
  }
}
