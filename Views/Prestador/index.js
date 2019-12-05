import React from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Colors,
  Avatar,
  Text,
  withTheme,
  Button,
  Card,
  Paragraph,
  List,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {http} from '../../Service/auth';
import Header from './Header';

class Prestador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: {},
      servicos: [],
    };
  }

  setPrestador = async () => {
    let id = 6;
    const prestador = JSON.parse(await AsyncStorage.getItem('usuario'));
    console.log(prestador);
    await this.setState({
      prestador,
    });
  };

  requestServicos = async () => {
    // try {
    const {id} = this.state.prestador;
    const response = await http.get(`servico/${id}/listar`);
    // alert(JSON.stringify(response));
    if (response.status === 200) {
      const servicos = response.data;
      console.log(servicos);
      this.setState({servicos});
    } else {
      console.log(response.data);
    }
    // } catch (e) {
    //   console.log(`servico/${this.state.prestador.id}/listar`);
    //   console.log(e);
    // }
  };

  componentDidMount = async () => {
    await this.setPrestador();
    this.requestServicos();
  };

  mudarRota = (rota, servicoId, prestador, valor) => {
    this.props.navigation.navigate(rota || 'Home', {
      servicoId,
    });
  };

  render() {
    const {
      theme: {
        colors: {background},
      },
    } = this.props;
    const {prestador, servicos} = this.state;
    console.log(prestador, servicos);
    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.row}>
              <Avatar.Image
                size={100}
                source={require('../../assets/real-estate.png')}
              />
              <View style={styles.col}>
                <Text style={styles.userName}>{prestador.usuario}</Text>
                <Text style={{paddingLeft: 20, paddingTop: 10, color: '#fff'}}>
                  <Icon name="star" /> 5.0
                </Text>
                <Text style={{paddingLeft: 20, paddingTop: 10, color: '#fff'}}>
                  {prestador.prestador && (
                    <>
                      <Icon name="user" />{' '}
                      <Text style={{color: '#fff'}}>autônomo</Text>
                    </>
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.descricao}>
              {prestador.descricao ||
                'Alguma descrição sobre esse prestador...'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Serviços</Text>
          </View>
          <View>
            <Button
              style={styles.buttonNovo}
              onPress={() => this.mudarRota('NovoContrato')}>
              Novo
            </Button>
          </View>
          {servicos &&
            servicos.map(servico => (
              <View key={servico.id}>
                <Card style={styles.card}>
                  <Card.Title
                    title={servico.nome}
                    subtitle={`R$ ${servico.valorBase}`}
                    left={props => <Avatar.Icon {...props} icon="folder" />}
                  />
                  <Card.Content>
                    <Paragraph>Descrição do serviço</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        this.mudarRota('EditarContrato', servico.id)
                      }>
                      Editar
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))}
          <View style={styles.row}>
            <Text style={styles.title}>Avaliações</Text>
          </View>
        </ScrollView>
        <Header mudarRota={rota => this.mudarRota(rota)} selected={3} />
      </View>
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
  col: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6700',
    height: 150,
  },
  userName: {fontSize: 30, marginLeft: 20, marginTop: 10, color: '#fff'},
  card: {margin: 10},
  title: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    padding: 10,
  },
  buttonNovo: {
    borderRadius: 5,
    borderColor: '#FF6700',
    height: 50,
    borderWidth: 1,
    marginLeft: 100,
    marginRight: 100,
    paddingTop: 5,
  },
});

export default withTheme(Prestador);
