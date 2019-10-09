import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Views/Login';
import Cadastrar from './Views/Cadastrar';
import Inicio from './Views/Usuario';
import Home from './Views/Usuario/Home';
import Prestador from './Views/Usuario/Prestador';
import EditarPerfil from './Views/Usuario/Perfil/editar';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Cadastrar: Cadastrar,
    Inicio: Inicio,
    Home: Home,
    Prestador: Prestador,
    EditarPerfil: EditarPerfil,
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
