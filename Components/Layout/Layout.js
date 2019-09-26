import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../../Views/Usuario/Home';
import Perfil from '../../Views/Usuario/Perfil';
import Contrato from '../../Views/Usuario/Contrato';
import Chat from '../../Views/Usuario/Chat';

export default class Layout extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'home', title: 'Home', icon: 'home', color: '#FF6700'},
      {key: 'chat', title: 'Chat', icon: 'chat-bubble', color: '#FF6700'},
      {
        key: 'contratos',
        title: 'Contratos',
        icon: 'archive',
        color: '#FF6700',
      },
      {key: 'perfil', title: 'Perfil', icon: 'person', color: '#FF6700'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    chat: Chat,
    contratos: Contrato,
    perfil: Perfil,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
