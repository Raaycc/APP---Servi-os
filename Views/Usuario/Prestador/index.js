import React from 'react';
import {View, BackHandler, StyleSheet, ScrollView} from 'react-native';
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
import {http} from '../../../Service/auth';
import Header from '../../../Components/Header/Header';

class Prestador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prestador: {},
      servicos: [],
    };
  }

  setPrestador = () => {
    this.setState({
      prestador: this.props.navigation.getParam('prestador'),
    });
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

  componentDidMount = () => {
    this.setPrestador();
    this.requestServicos();
  };

  mudarRota = (rota, servicoId, prestador, valor) => {
    this.props.navigation.navigate(rota || 'Home', {
      prestador,
      servicoId,
      valor,
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
        <Header mudarRota={() => this.mudarRota()} />
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.row}>
              <Avatar.Image
                size={100}
                source={require('../../../assets/real-estate.png')}
              />
              <View style={styles.col}>
                <Text style={styles.userName}>{prestador.usuario}</Text>
                <Text style={{paddingLeft: 20, paddingTop: 10, color: '#fff'}}>
                  <Icon name="star" />
                  {' ' + prestador.nota}
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
            <Text style={styles.descricao}>{prestador.descricao}</Text>
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
                    <Button>Exibir todos</Button>
                    <Button
                      onPress={() =>
                        this.mudarRota(
                          'Contratar',
                          servico.id,
                          prestador,
                          servico.valorBase,
                        )
                      }>
                      Contratar
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))}
          <View style={styles.row}>
            <Text style={styles.title}>Avaliações</Text>
          </View>
        </ScrollView>
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
  card: {margin: 20},
  title: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    padding: 10,
  },
});

export default withTheme(Prestador);
