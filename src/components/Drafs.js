import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: 300,
    backgroundColor: '#fff',
    flex: 1,
  },
  userContainer: {
    height: 150,
    backgroundColor: '#00AAFF',
    paddingTop: 30,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cartContainer: {
    paddingTop: 10,
    paddingLeft: 14,
    paddingRight: 14,
    flex: 1,
  },
  cartTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
  }
});

class Drafs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text>User info will be here</Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Cart contents</Text>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}

export default Drafs;
