import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import {Colors, Card, withTheme, Button, Chip} from 'react-native-paper';
import {http} from '../../../Service/auth';
import Header from '../Header';

class Contrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      usuario: {},
      servicos: [],
    };
    // this.backButtonClick = this.backButtonClick.bind(this);
  }
  static navigationOptions = {
    header: null,
    title: 'Contrato',
  };

  mudarRota = rota => {
    console.log(this.props);
    this.props.navigation.navigate(rota);
  };

  componentDidMount = () => {
    this.requestUser();
    this.requestContratos();
    this.requestServicos();
  };

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  requestServicos = async () => {
    try {
      const response = await http.get('servico/listar');
      // alert(JSON.stringify(response));
      if (response.status === 200) {
        const servicos = response.data;
        this.setState({servicos});
      }
    } catch (e) {
      console.log(e);
    }
  };

  requestContratos = async () => {
    try {
      const response = await http.get(`contrato`);
      // alert(JSON.stringify(response));
      if (response.status === 200) {
        const lista = response.data;
        this.setState({lista});
      }
    } catch (e) {
      console.log(e);
    }
  };

  cancelarContrato = async id => {
    try {
      const response = await http.put(`contrato/${id}`, {status: 4});
      // alert(JSON.stringify(response));
      if (response.status === 200) {
        this.requestContratos();
      }
    } catch (e) {
      console.log(e);
    }
  };

  confirmarContrato = async id => {
    try {
      const response = await http.put(`contrato/${id}`, {status: 6});
      // alert(JSON.stringify(response));
      if (response.status === 200) {
        this.requestContratos();
      }
    } catch (e) {
      console.log(e);
    }
  };

  getNome = id => {
    let nome = '';
    this.state.servicos.map(s => {
      if (s.id === id) {
        nome = s.nome;
      }
    });
    return nome;
  };

  getStatus = status => {
    if (status === 1) return 'em aberto';
    if (status === 2) return 'em andamento';
    if (status === 3) return 'recusado pelo prestador';
    if (status === 4) return 'cancelado pelo cliente';
    if (status === 5) return 'cancelado pelo prestador';
    if (status === 6) return 'concluido';
  };

  render() {
    console.log(this.state.lista);
    const {lista} = this.state;
    return (
      <>
        <ScrollView>
          {lista &&
            lista.map(contrato => (
              <Card style={styles.card} key={contrato.id}>
                <Card.Title
                  title={`Serviço: ${this.getNome(contrato.id_servico)}`}
                  subtitle={`R$ ${contrato.valor}`}
                />
                <Card.Content>
                  <Text>Data: {contrato.data}</Text>
                  <Text>Descrição: {contrato.descricao}</Text>

                  <Chip
                    style={{
                      backgroundColor:
                        contrato.status > 2 && contrato.status <= 5
                          ? 'red'
                          : contrato.status === 6
                          ? 'green'
                          : '#4287f5',
                      margin: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff'}}>
                      {this.getStatus(contrato.status)}
                    </Text>
                  </Chip>
                </Card.Content>
                <Card.Actions>
                  {contrato.status <= 2 && (
                    <Button onPress={() => this.cancelarContrato(contrato.id)}>
                      Cancelar
                    </Button>
                  )}
                  {contrato.status === 2 && (
                    <Button onPress={() => this.confirmarContrato(contrato.id)}>
                      Confirmar
                    </Button>
                  )}
                </Card.Actions>
              </Card>
            ))}
        </ScrollView>
        <Header mudarRota={rota => this.mudarRota(rota)} selected={2} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6700',
    height: 150,
  },
  userName: {fontSize: 30, marginLeft: 20, marginTop: 10, color: '#fff'},
  card: {margin: 20},
});

export default withTheme(Contrato);
