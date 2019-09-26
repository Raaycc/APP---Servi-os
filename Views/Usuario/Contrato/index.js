import React, {Component} from 'react';
import {Text, View, BackHandler} from 'react-native';

export default class Contrato extends Component {
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
        <View>
          <Text> FAZER A LISTAGEM DE CONTRATOS</Text>
        </View>
      </>
    );
  }
}
