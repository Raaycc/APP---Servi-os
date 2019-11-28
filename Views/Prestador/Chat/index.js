import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {List, Colors, Divider} from 'react-native-paper';
import Header from '../Header';
import {http} from '../../../Service/auth';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
  }

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  componentDidMount = async () => {

    const request = await http.get('chat');
    if (request.status === 200) {
      console.log(request.data);
      this.setState({chats: request.data});
    }else {
      console.log(request.status);
    }
  }

  render() {
    return (
      <>
        <View style={{flex: 1, padding: 10}}>
          <List.Section>
            <List.Subheader>Chat</List.Subheader>
            {
              this.state.chats.map((chat, index) => {
                return (
                  <View key={index}>
                <List.Item
                  onPress={() => this.props.navigation.push('OpenedChat', {
                    chat
                  })}
                  title={chat.client.usuario}
                  description={chat.last_message}
                  left={() => <List.Icon icon="person" />}
                  />
                  <Divider />
                  </View>
                );
              })
            }
            
            
          </List.Section>
        </View>
        <Header mudarRota={rota => this.mudarRota(rota)} selected={1} />
      </>
    );
  }
}
