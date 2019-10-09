import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {http} from '../../../Service/auth';
import InputDefault from '../../../Components/Inputs/InputDefault';
import Header from '../../../Components/Header/Header';

export default class EditarPerfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      usuario: '',
      telefone: '',
      cpf: '',
      endereco: '',
      email: '',
    };
  }

  componentDidMount = () => {
    this.requestUser();
  };
  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});

    const u = this.state.usuario;
    this.setState({
      id: u.id,
      usuario: u.usuario,
      telefone: u.telefone,
      cpf: u.cpf,
      endereco: u.endereco,
      email: u.email,
    });
  };

  static navigationOptions = {
    header: null,
  };

  atualizarPerfil = async () => {
    try {
      const response = await http.put(`usuario/${this.state.id}`, {
        usuario: this.state.usuario,
        email: this.state.email.toLocaleLowerCase(),
        endereco: this.state.endereco,
        cpf: this.state.cpf,
        telefone: this.state.telefone,
      });
      console.log(response.data);
      if (response.status < 300) {
        alert(JSON.stringify(response.data));
        this.props.navigation.navigate('Perfil');
      }
      alert(JSON.stringify(response.data));
    } catch (e) {
      alert('Não foi possível atualizar o perfil');
      console.log(e);
    }
  };

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <ScrollView>
        <Header title="Atualizar Perfil" />
        <View style={styles.viewLogin}>
          <InputDefault
            nome="Nome"
            value={this.state.usuario}
            onChange={value => this.setState({usuario: value})}
          />
          <InputDefault
            nome="Email"
            value={this.state.email}
            onChange={value => this.setState({email: value})}
          />
          <InputDefault
            nome="CPF"
            value={this.state.cpf}
            onChange={value => this.setState({cpf: value})}
          />
          <InputDefault
            nome="Endereço"
            value={this.state.endereco}
            onChange={value => this.setState({endereco: value})}
          />
          <InputDefault
            nome="Telefone"
            value={this.state.telefone}
            onChange={value => this.setState({telefone: value})}
          />
          <Button
            buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
            titleStyle={{fontSize: 21}}
            title="Atualizar"
            onPress={() => this.atualizarPerfil()}
          />
          <Button
            buttonStyle={styles.buttonLogin}
            titleStyle={{fontSize: 21, color: '#FF6700'}}
            type="outline"
            title="Cancelar"
            onPress={() => this.mudarRota('Perfil')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewLogin: {
    minWidth: '70%',
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLogin: {
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#FF6700',
    height: 50,
    borderWidth: 1,
  },
});
