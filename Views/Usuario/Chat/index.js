import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {List, Colors, Divider} from 'react-native-paper';
import Header from '../Header';

export default class Chat extends Component {
  mudarRota = rota => {
    console.log(this.props);
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <>
        <View style={{flex: 1, padding: 10}}>
          <List.Section>
            <List.Subheader>Chat</List.Subheader>
            <List.Item
              title="Jubileu"
              description="Uma mensagem bem top dessa pessoa..."
              left={() => <List.Icon icon="person" />}
            />
            <Divider />
            <List.Item
              title="Fulaninho"
              description="Mensagenzinha aqui"
              left={() => <List.Icon color="blue" icon="person" />}
            />
            <Divider />
            <List.Item
              title="Teste"
              description="Digitando..."
              left={() => <List.Icon icon="person" />}
            />
            <Divider />
          </List.Section>
        </View>
        <Header mudarRota={rota => this.mudarRota(rota)} selected={1} />
      </>
    );
  }
}
