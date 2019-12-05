import React from 'react';
import {View, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {http} from '../../../Service/auth';
import Header from '../../../Components/Header/Header';
// import { Container } from './styles';

export default class Contrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: '',
      valor: '',
      nome: '',
      mode: 'date',
      show: false,
    };
  }

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  getParams = async () => {
    const id = this.props.navigation.getParam('servicoId');
    console.log(id);
    const response = await http.get(`servico/${id}/listar`);
    const servico = response.data[0];
    console.log(servico);
    this.setState({
      servico,
      nome: servico.nome,
      valor: servico.valorBase,
    });
  };

  EditarContrato = async () => {
    try {
      const {valor, nome, servico} = this.state;

      const response = await http.post(`servico/cadastrar`, {
        nome: nome,
        valorBase: valor,
      });

      console.log(response);
      if (response.status < 300) {
        // alert(JSON.stringify(response.data));
        this.props.navigation.push('Home');
      }
      // alert(JSON.stringify(response.data));
    } catch (e) {
      alert('Não foi possível criar!');
      console.log(e);
    }
  };

  componentDidMount = async () => {
    this.requestUser();
  };

  mudarRota = (rota, prestador) => {
    this.props.navigation.navigate(rota, {
      prestador,
    });
  };

  render() {
    const {show, date, mode, data} = this.state;
    return (
      <>
        <Header
          title="Criar Serviço"
          mudarRota={() => this.mudarRota('Home')}
        />
        <ScrollView>
          <View style={styles.viewLogin}>
            <Input
              placeholder="Nome"
              value={this.state.nome}
              onChange={e => {
                this.setState({nome: e.nativeEvent.text});
              }}
            />
            <Input
              placeholder="Valor"
              value={'R$ ' + this.state.valor}
              onChange={e =>
                this.setState({valor: e.nativeEvent.text.split(' ')[1]})
              }
            />
            <Button
              buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
              titleStyle={{fontSize: 21}}
              title="Criar"
              onPress={() => this.EditarContrato()}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              titleStyle={{
                fontSize: 21,
                color: '#FF6700',
                alignContent: 'flex-start',
              }}
              type="outline"
              title="Voltar"
              onPress={() => this.mudarRota('Home')}
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
