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

  atualizarPerfil = async () => {
    try {
      const {usuario, email, endereco, cpf, telefone} = this.state;
      const response = await http.put(`usuario/${this.state.id}`, {
        usuario,
        email: email.toLocaleLowerCase(),
        endereco,
        cpf,
        telefone,
      });

      console.log(response.data);
      if (response.status < 300) {
        const usuario2 = await AsyncStorage.getItem('usuario');

        let usuarioEditado = JSON.parse(usuario2);

        usuarioEditado.usuario = usuario;
        usuarioEditado.email = email.toLocaleLowerCase();
        usuarioEditado.endereco = endereco;
        usuarioEditado.cpf = cpf;
        usuarioEditado.telefone = telefone;

        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioEditado));

        // alert(JSON.stringify(response.data));
        this.props.navigation.push('Perfil');
      }
      // alert(JSON.stringify(response.data));
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
    padding: 40,
    borderRadius: 20,
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
