import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import Layout from '../../Components/Layout/Layout';
import Header from './Header';

export default class Inicio extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'#FF6700'}
            barStyle={'dark-content'}
            translucent={false}
          />
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Layout />
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
