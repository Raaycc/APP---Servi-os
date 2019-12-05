import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, AsyncStorage } from 'react-native';
import {http} from '../../../../Service/auth';
// import { Container } from './styles';
import Header from '../../../../Components/Header/Header';
export default class OpenedChat extends Component {
  
  state = {
    chat: this.props.navigation.getParam('chat'),
    messages: [],
  }
  
  componentDidMount = async () =>  {
    setInterval(() => {
      this.getMsg();
    }, 3000)
  }

  getMsg = async () => {
    const usuario = await AsyncStorage.getItem('usuario');
    const request = await http.get('chat/' + this.state.chat.id);
    if (request.status === 200) {
      let messages = [];
      request.data.map(chat => {
        let data = chat.created_at.split('-').join('/');
        messages.push({
          _id: chat.id,
          text: chat.content,
          createdAt: new Date(data),
          user: {
            _id: chat.provider ? 1 : 2,
            name: chat.provider ? this.state.chat.client.usuario : usuario.usuario,
          }
        });
      });
      
      this.setState({messages});
    }
  }

  onSend = async (messages = []) => {

    if(true) {
      const request = await http.post('chat/' + this.state.chat.id, {
        content: messages[0].text
      });
    } else {
      console.log(messages);
    }
    
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  mudarRota = () => {
    this.props.navigation.navigate('Chat');
  };

  render() {
    return (
      <>
      <View style={{ height: 40, zIndex: 6}}>
          <Header mudarRota={() => this.mudarRota()} title={this.state.chat.client.usuario}/>
      </View>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </>
    )
  }
}
