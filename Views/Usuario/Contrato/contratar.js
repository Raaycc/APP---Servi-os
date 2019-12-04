import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {http} from '../../../Service/auth';
import InputDefault from '../../../Components/Inputs/InputDefault';
import Header from '../../../Components/Header/Header';
// import { Container } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

export default class Contrato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: '',
      valor: '',
      descricao: 'sim',
      data: dayjs().format('DD/MM/YY'),
      hora: new Date().toLocaleTimeString('BRT'),
      mode: 'date',
      show: false,
    };
  }

  setDate = (event, date, mode) => {
    if (mode === 'date') {
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        data: dayjs(new Date(date)).format('DD/MM/YY'),
      });
    } else {
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        hora: new Date(date).toLocaleTimeString('BRT'),
      });
    }
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  getParams = () => {
    const prestador = this.props.navigation.getParam('prestador');
    const servico = this.props.navigation.getParam('servicoId');
    const valor = this.props.navigation.getParam('valor');
    console.log(servico);
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

      const dataLoka =
        '20' +
        data.split('/')[2] +
        '-' +
        data.split('/')[1] +
        '-' +
        data.split('/')[0];
      console.log(
        hora +
          '  - id:' +
          prestador.id +
          '  - id:' +
          servico +
          '  - id:' +
          usuario.id,
        dataLoka,
        valor,
      );
      const response = await http.post(`contrato`, {
        id_prestador: prestador.id,
        id_servico: servico,
        id_cliente: usuario.id,
        valor,
        descricao,
        data: dataLoka,
        hora,
      });

      console.log(response);
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
    const {show, date, mode, data} = this.state;
    return (
      <>
        <Header
          title="Criar Contrato"
          mudarRota={() => this.mudarRota('Contrato')}
        />
        <ScrollView>
          <View style={styles.viewLogin}>
            <Input
              placeholder="Descrição"
              value={this.state.descricao}
              onChange={e => {
                this.setState({descricao: e.nativeEvent.text});
              }}
            />
            <Input
              placeholder="Valor"
              value={'R$ ' + this.state.valor}
              onChange={e => this.setState({valor: e.nativeEvent.text})}
            />
            <TouchableWithoutFeedback
              styles={styles.buttonLogin}
              onPress={() => this.timepicker()}>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 10,
                  paddingLeft: 5,
                  marginRight: 10,
                  paddingBottom: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#757575',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: this.state.hora ? 'black' : '#a1a1a1',
                  }}>
                  {this.state.hora !== '' ? this.state.hora : 'Escolha a hora'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              styles={styles.buttonLogin}
              onPress={() => this.datepicker()}>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 10,
                  paddingLeft: 5,
                  marginRight: 10,
                  paddingBottom: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#757575',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: this.state.data ? 'black' : '#a1a1a1',
                  }}>
                  {this.state.data !== '' ? this.state.data : 'Escolha a Data'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Button
              buttonStyle={[styles.buttonLogin, {backgroundColor: '#FF6700'}]}
              titleStyle={{fontSize: 21}}
              title="Criar"
              onPress={() => this.criarContrato()}
            />
            <Button
              buttonStyle={styles.buttonLogin}
              titleStyle={{
                fontSize: 21,
                color: '#FF6700',
                alignContent: 'flex-start',
              }}
              type="outline"
              title="Cancelar"
              onPress={() => this.mudarRota('Prestador', this.state.prestador)}
            />
          </View>
          {show && (
            <DateTimePicker
              value={new Date('2019-11-20T14:42:42')}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={(event, date) => this.setDate(event, date, mode)}
            />
          )}
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
