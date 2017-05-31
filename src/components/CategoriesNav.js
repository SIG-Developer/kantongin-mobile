import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 0,
  },
  btn: {
    fontSize: '0.8rem',
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold'
  },
  backBtn: {
    fontSize: '1.5rem',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  }
});

class CategoriesNav extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { categories } = this.props;
    const categoriesByPath = categories.items
      .filter(i => i.parent_id === categories.activeId)
      .reverse();
    const categoriesButtons = categoriesByPath.map((item, index) =>
      <TouchableOpacity
        key={index}
        onPress={() => this.props.onCategoryPress(item)}
      >
        <Text
          style={styles.btn}
        >
          {item.category.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
    // If we are in the sub. category then add the back btn.
    const backButton = () => {
      if (categories.path.length) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.onBackPress(
                categories.items.filter(i => i.category_id === categories.activeId)[0]
              );
            }}
          >
            <Icon
              name={'angle-left'}
              style={styles.backBtn}
            />
          </TouchableOpacity>
        );
      }
      return null;
    };
    return (
      <ScrollView
        style={styles.container}
        horizontal
      >
        {backButton()}
        {categoriesButtons}
      </ScrollView>
    );
  }
}

CategoriesNav.propTypes = {
  categories: PropTypes.shape({}).isRequired,
  onCategoryPress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default CategoriesNav;
