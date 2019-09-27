import React, {Component} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import {http} from '../../Service/auth';
import InputDefault from '../../Components/Inputs/InputDefault';
// import { Container } from './styles';

export default class Cadastrar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      text: '',
      login: 'usuariooooooo',
      senha: '123',
      email: '',
      cpf: '000.000.000-00',
      rua: 'qualquer',
      numero: '23',
      cidade: 'Juazeiro',
      telefone: '(88) 999201212',
    };
  }

  static navigationOptions = {
    header: null,
  };

  fazerCadastro = async () => {
    let sim = {
      usuario: this.state.login,
      email: this.state.email,
      password: this.state.senha,
      endereco: 'sim',
      cpf: this.state.cpf,
      telefone: this.state.telefone,
    };

    console.log(sim);
    try {
      const response = await http.post('usuario/cadastrar', {
        usuario: this.state.login,
        email: this.state.email,
        password: this.state.senha,
        endereco: 'sim',
        cpf: this.state.cpf,
        telefone: this.state.telefone,
      });
      console.log(response.data);
      if (response.status < 300) {
        alert(JSON.stringify(response.data));
        this.props.navigation.navigate('Login');
      }
      alert(JSON.stringify(response.data));
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
              nome="Usuario"
              value={this.state.login}
              onChange={value => this.setState({login: value})}
            />
            <InputDefault
              nome="Email"
              value={this.state.email}
              onChange={value => this.setState({email: value})}
            />
            <InputDefault
              nome="Senha"
              value={this.state.senha}
              onChange={value => this.setState({senha: value})}
              senha={true}
            />
            <InputDefault
              nome="CPF"
              value={this.state.cpf}
              onChange={value => this.setState({cpf: value})}
            />
            <InputDefault
              nome="Rua"
              value={this.state.rua}
              onChange={value => this.setState({rua: value})}
            />
            <InputDefault
              nome="Numero"
              value={this.state.numero}
              onChange={value => this.setState({numero: value})}
            />
            <InputDefault
              nome="Cidade"
              value={this.state.cidade}
              onChange={value => this.setState({cidade: value})}
            />
            <InputDefault
              nome="Telefone"
              value={this.state.telefone}
              onChange={value => this.setState({telefone: value})}
            />
            <Button
              buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
              titleStyle={{fontSize: 21}}
              title="Cadastrar"
              onPress={() => this.fazerCadastro()}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              titleStyle={{fontSize: 21, color: '#FF6700'}}
              type="outline"
              title="Voltar"
              onPress={() => this.mudarRota('Login')}
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
