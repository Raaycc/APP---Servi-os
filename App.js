import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Views/Login';
import Cadastrar from './Views/Cadastrar';
import Inicio from './Views/Usuario';
import Home from './Views/Usuario/Home';
import Prestador from './Views/Usuario/Prestador';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Inicio: Inicio,
    HomeUsuario: Home,
    Cadastrar: Cadastrar,
    Prestador: Prestador,
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
