import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from '../../../Components/Header/Header';

export default class Chat extends Component {
  render() {
    return (
      <>
        <View>
          <Header title="Chat" subtitle="Pra conversar" />
          <Text> FAZER O CHAT</Text>
        </View>
      </>
    );
  }
}
