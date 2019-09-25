import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./Views/Login";
import Home from "./Views/Usuario/Home";
import Cadastrar from './Views/Cadastrar';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    HomeUsuario: Home,
    Cadastrar: Cadastrar
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);