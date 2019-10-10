import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Views/Login';
import Cadastrar from './Views/Cadastrar';

import Home from './Views/Usuario/Home';
import Prestador from './Views/Usuario/Prestador';
import Perfil from './Views/Usuario/Perfil';
import EditarPerfil from './Views/Usuario/Perfil/editar';
import Contrato from './Views/Usuario/Contrato';
import Chat from './Views/Usuario/Chat';

const LoginStack = createStackNavigator(
  {
    Login: Login,
    Cadastrar: Cadastrar,
  },
  {
    initialRouteName: 'Login',
  },
);

const AuthStack = createStackNavigator(
  {
    Home: Home,
    Prestador: Prestador,
    Chat: Chat,
    Contrato: Contrato,
    Perfil: Perfil,
    EditarPerfil: EditarPerfil,
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
  Auth: {
    screen: AuthStack,
  },
});

export default createAppContainer(App);
