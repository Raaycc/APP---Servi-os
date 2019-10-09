import React from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import {
  Colors,
  Searchbar,
  List,
  Text,
  Chip,
  Divider,
  withTheme,
  IconButton,
} from 'react-native-paper';
import {http} from '../../../Service/auth';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      servicos: [],
      lista: [],
      ListaPrestador: [],
    };
    // this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentWillMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  };

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  async componentDidMount() {
    this.requestPrestadores();
  }

  requestPrestadores = async () => {
    try {
      const response = await http.get('prestadores');
      alert(JSON.stringify(response));
      if (response.status === 200) {
        const lista = response.data;

        this.setState({lista, ListaPrestador: lista});
      }
    } catch (e) {
      console.log(e);
    }
  };

  backButtonClick = () => {
    return false;
  };

  filtrarLista = text => {
    const ListaPrestador = this.state.lista.filter(item => {
      return item.usuario.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });

    this.setState({ListaPrestador, firstQuery: text});
  };

  static navigationOptions = {
    header: null,
  };

  mudarRota = rota => {
    console.log(this.props);
    this.props.navigation.navigate('Prestador');
  };

  render() {
    const {
      theme: {
        colors: {background},
      },
    } = this.props;
    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <Searchbar
          placeholder="Search"
          onChangeText={query => this.filtrarLista(query)}
          value={this.state.firstQuery}
          style={styles.searchbar}
        />
        <ScrollView>
          <ScrollView horizontal={true}>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#pedreiro</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#pintor</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#babá</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#pedreiro</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#pintor</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.textTag}>#babá</Text>
              </View>
            </View>
          </ScrollView>
          <List.Section>
            <List.Subheader>Em alta</List.Subheader>
            {this.state.ListaPrestador.map(prestador => {
              return (
                <>
                  <List.Item
                    left={() => (
                      <Image
                        source={require('../../../assets/real-estate.png')}
                        style={styles.image}
                      />
                    )}
                    right={props => <Text {...props}>1.5 km</Text>}
                    title={
                      <Text style={styles.title}>{prestador.usuario}</Text>
                    }
                    onPress={() => this.mudarRota('Prestador')}
                    description={() => (
                      <View style={[styles.description, {paddingTop: 8}]}>
                        <Chip icon="star-border" style={styles.description}>
                          5.0
                        </Chip>
                        <Chip icon="person" style={styles.description}>
                          Autônomo
                        </Chip>
                      </View>
                    )}
                  />
                  <Divider />
                </>
              );
            })}
          </List.Section>
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
  searchbar: {
    margin: 4,
  },
  image: {
    height: 80,
    width: 80,
    margin: 8,
  },
  row: {
    flexDirection: 'row',
  },
  title: {fontWeight: 'bold'},
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
  },
  tag: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 50,
    backgroundColor: '#FF6700',
  },
  textTag: {padding: 10, color: '#fff', fontWeight: 'bold'},
  description: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
});

export default withTheme(Home);
