import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./Views/Login";
import Home from "./Views/Usuario/Home";

const AppNavigator = createStackNavigator(
  {
    Home: Login,
    HomeUsuario: Home
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);