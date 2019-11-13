import React from 'react';
import {View, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import {http} from '../../../Service/auth';
import InputDefault from '../../../Components/Inputs/InputDefault';
import Header from '../../../Components/Header/Header';
// import { Container } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Contrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: '',
      valor: '',
      descricao: '',
      data: '2019-01-01',
      hora: '00:00:00',
      mode: 'date',
      show: false,
    };
  }

  setDate = (event, date, mode) => {
    
    if(mode === 'date') {
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        data: date,
      });
    } else {
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        hora: date,
      });
    }
    
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
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
    const { show, date, mode, data } = this.state;
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
            <Button
              title={this.state.hora || 'Hora'}
              type="outline"
              titleStyle={{fontSize: 21, color: '#FF6700'}}
              buttonStyle={styles.buttonLogin}
              onPress={() => this.timepicker()}
            />
            <Button
              title={this.state.hora || 'Data'}
              type="outline"
              titleStyle={{fontSize: 21, color: '#FF6700'}}
              buttonStyle={styles.buttonLogin}
              onPress={() => this.datepicker()}
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
          { show && <DateTimePicker value={new Date('2020-06-12T14:42:42')}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate, mode} />
          }
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
