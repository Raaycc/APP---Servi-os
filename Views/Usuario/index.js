import React, {Component} from 'react';
import {Text, View, BackHandler, StatusBar, StyleSheet} from 'react-native';
import Layout from '../../Components/Layout/Layout';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentWillMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  backButtonClick = () => {
    return true;
  };

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
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
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
