import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Views/Login';
import Home from './Views/Usuario/Home';
import Cadastrar from './Views/Cadastrar';
import Inicio from './Views/Usuario';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Inicio: Inicio,
    HomeUsuario: Home,
    Cadastrar: Cadastrar,
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
