import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../../Views/Usuario/Home';
import Perfil from '../../Views/Usuario/Perfil';
import Contrato from '../../Views/Usuario/Contrato';
import Chat from '../../Views/Usuario/Chat';
import EditarPerfil from '../../Views/Usuario/Perfil/editar';

export default class Layout extends React.Component {
  render() {
    console.log(this.props);
    return <AppContainer />;
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={25} color={tintColor} />
        ),
      },
    },
    Chat: {
      screen: EditarPerfil,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="comments" size={25} color={tintColor} />
        ),
      },
    },
    Contrato: {
      screen: Contrato,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="inbox" size={25} color={tintColor} />
        ),
      },
    },
    Perfil: {
      screen: Perfil,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" size={25} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      style: {
        backgroundColor: '#FF6700',
      },
      inactiveTintColor: '#F9B98E',
      activeTintColor: '#eee',
    },
  },
);

const AppContainer = createAppContainer(bottomTabNavigator);
