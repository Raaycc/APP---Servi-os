import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../Header';

export default class Chat extends Component {
  mudarRota = rota => {
    console.log(this.props);
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <Text> FAZER O CHAT</Text>
        </View>
        <Header mudarRota={rota => this.mudarRota(rota)} selected={1} />
      </>
    );
  }
}
