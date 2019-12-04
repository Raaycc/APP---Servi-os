import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Views/Login';
import Cadastrar from './Views/Cadastrar';

import Home from './Views/Usuario/Home';
import Prestador from './Views/Usuario/Prestador';
import Perfil from './Views/Usuario/Perfil';
import EditarPerfil from './Views/Usuario/Perfil/editar';
import Contrato from './Views/Usuario/Contrato';
import Contratar from './Views/Usuario/Contrato/contratar';
import Chat from './Views/Usuario/Chat';
import OpenedChat from './Views/Usuario/Chat/OpenedChat';
import HomePrestador from './Views/Prestador';
import ChatPrestador from './Views/Prestador/Chat';
import ContratoPrestador from './Views/Prestador/Contrato';
import PerfilPrestador from './Views/Prestador/Perfil';
import OpenedChatPrestador from './Views/Prestador/Chat/OpenedChat';
import EditarContrato from './Views/Prestador/EditarContrato';
import NovoContrato from './Views/Prestador/NovoContrato';

const LoginStack = createStackNavigator(
  {
    Login: Login,
    Cadastrar: Cadastrar,
  },
  {
    initialRouteName: 'Login',
  },
);

const UsuarioStack = createStackNavigator(
  {
    Home: Home,
    Prestador: Prestador,
    Chat: Chat,
    Contrato: Contrato,
    Contratar: Contratar,
    Perfil: Perfil,
    EditarPerfil: EditarPerfil,
    OpenedChat: OpenedChat
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const PrestadorStack = createStackNavigator(
  {
    Home: HomePrestador,
    Chat: ChatPrestador,
    Perfil: PerfilPrestador,
    Contrato: ContratoPrestador,
    OpenedChat: OpenedChatPrestador,
    EditarContrato: EditarContrato,
    NovoContrato: NovoContrato
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const App = createSwitchNavigator({
  Principal: {
    screen: LoginStack,
  },
  UsuarioStack: {
    screen: UsuarioStack,
  },
  PrestadorStack: {
    screen: PrestadorStack,
  },
});

export default createAppContainer(App);
