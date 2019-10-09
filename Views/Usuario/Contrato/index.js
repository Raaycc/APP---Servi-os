import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import {Colors, Card, withTheme, Button} from 'react-native-paper';
import {http} from '../../../Service/auth';

class Contrato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      usuario: {},
    };
    // this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentDidMount = () => {
    this.requestUser();
    this.requestContratos();
  };

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  requestContratos = async () => {
    try {
      const response = await http.get(
        `usuario/${this.state.usuario.id}/contrato`,
      );
      alert(JSON.stringify(response));
      if (response.status === 200) {
        const lista = response.data;
        this.setState({lista});
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.state.lista);
    return (
      <ScrollView>
        {this.state.lista.map(contrato => (
          <Card style={styles.card}>
            <Card.Title
              title={`Serviço: ${contrato.id_servico}`}
              subtitle={`R$ ${contrato.valor}`}
            />
            <Card.Content>
              <Text>Data: {contrato.data}</Text>
              <Text>Descrição: {contrato.descricao}</Text>
              <Text>Status: {contrato.status}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Cancelar</Button>
              <Button>Confirmar</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
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
