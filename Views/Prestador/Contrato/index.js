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
      const response = await http.get(
        `usuario/${this.state.usuario.id}/contrato`,
      );
      // alert(JSON.stringify(response));
      if (response.status === 200) {
        const lista = response.data;
        this.setState({lista});
      }
    } catch (e) {
      console.log(e);
    }
  };

  deletarContrato = async id => {
    try {
      const response = await http.delete(
        `usuario/${this.state.usuario.id}/contrato/${id}`,
      );
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
                  {contrato.status === 1 && (
                    <Chip
                      style={{
                        backgroundColor: '#4287f5',
                        margin: 20,
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#fff'}}>aguardando</Text>
                    </Chip>
                  )}
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => this.deletarContrato(contrato.id)}>
                    Cancelar
                  </Button>
                  <Button>Confirmar</Button>
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
