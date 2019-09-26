import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import {Image, Button} from 'react-native-elements';
import {http} from '../../Service/auth';
import InputDefault from '../../Components/Inputs/InputDefault';
// import { Container } from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      text: '',
      login: 'teste',
      senha: '123',
    };
  }

  static navigationOptions = {
    header: null,
  };

  fazerLogin = async () => {
    try {
      const response = await http.post('login', {
        codigo: '0001',
        login: this.state.login,
        password: this.state.senha,
      });
      console.log(response.data);
      if (response.status === 200) {
        const {token, usuario} = response.data;
        const {nivel} = usuario;

        await AsyncStorage.setItem('nivel', nivel);
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
        this.props.navigation.navigate('Inicio');
      }
    } catch (e) {
      alert('Credenciais Erradas');
      console.log(e);
    }
  };

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.viewLogin}>
          <View>
            <InputDefault
              nome="Login"
              value={this.state.login}
              onChange={value => this.setState({login: value})}
              senha={false}
            />
            <InputDefault
              nome="Senha"
              value={this.state.senha}
              onChange={value => this.setState({senha: value})}
              senha={true}
            />
            <Button
              buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
              titleStyle={{fontSize: 21}}
              title="Login"
              onPress={() => this.mudarRota('Inicio')}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              titleStyle={{fontSize: 21, color: '#FF6700'}}
              type="outline"
              title="Criar Conta"
              onPress={() => this.mudarRota('Cadastrar')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLogin: {
    minWidth: '70%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonLogin: {
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#FF6700',
    height: 50,
    borderWidth: 1,
  },
});
