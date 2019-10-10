import React from 'react';
import {View, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {http} from '../../../Service/auth';
import InputDefault from '../../../Components/Inputs/InputDefault';
import Header from '../../../Components/Header/Header';
// import { Container } from './styles';

export default class Contrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: '',
      valor: '',
      descricao: '',
      data: '2019-01-01',
      hora: '00:00:00',
    };
  }

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  getParams = () => {
    const prestador = this.props.navigation.getParam('prestador');
    const servico = this.props.navigation.getParam('servicoId');
    const valor = this.props.navigation.getParam('valor');
    console.log(prestador);
    this.setState({
      prestador,
      servico,
      valor,
    });
  };

  criarContrato = async () => {
    try {
      const {
        prestador,
        servico,
        valor,
        descricao,
        usuario,
        data,
        hora,
      } = this.state;
      console.log(
        prestador.id,
        servico,
        usuario.id,
        valor,
        descricao,
        data,
        hora,
      );
      const response = await http.post(`usuario/${usuario.id}/contrato`, {
        id_prestador: prestador.id,
        id_servico: servico,
        id_cliente: usuario.id,
        valor,
        descricao,
        data,
        hora,
      });

      console.log(response.data);
      if (response.status < 300) {
        // alert(JSON.stringify(response.data));
        this.props.navigation.push('Contrato');
      }
      // alert(JSON.stringify(response.data));
    } catch (e) {
      alert('Não foi possível criar o contrato');
      console.log(e);
    }
  };

  componentDidMount = () => {
    this.getParams();
    this.requestUser();
  };

  mudarRota = (rota, prestador) => {
    this.props.navigation.navigate(rota, {
      prestador,
    });
  };

  render() {
    console.log(this.state.prestador);
    return (
      <>
        <Header
          title="Criar Contrato"
          mudarRota={() => this.mudarRota('Contrato')}
        />
        <ScrollView>
          <View style={styles.viewLogin}>
            <InputDefault
              nome="Descrição"
              value={this.state.descricao}
              onChange={value => this.setState({descricao: value})}
            />
            <InputDefault
              nome="Valor"
              value={this.state.valor}
              onChange={value => this.setState({valor: value})}
            />
            <InputDefault
              nome="Hora"
              value={this.state.hora}
              onChange={value => this.setState({hora: value})}
            />
            <InputDefault
              nome="Data"
              value={this.state.data}
              onChange={value => this.setState({data: value})}
            />
            <Button
              buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
              titleStyle={{fontSize: 21}}
              title="Criar"
              onPress={() => this.criarContrato()}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              titleStyle={{fontSize: 21, color: '#FF6700'}}
              type="outline"
              title="Cancelar"
              onPress={() => this.mudarRota('Prestador', this.state.prestador)}
            />
          </View>
        </ScrollView>
      </>
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
