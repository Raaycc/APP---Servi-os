import * as React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {List, Avatar, Divider, Text} from 'react-native-paper';

export default class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {
        nome: '',
        telefone: '',
        cpf: '',
        endereco: '',
        email: '',
      },
    };
    // this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentDidMount = () => {
    this.requestUser();
  };

  requestUser = async () => {
    const usuario = await AsyncStorage.getItem('usuario');

    this.setState({usuario: JSON.parse(usuario)});
  };

  mudarRota = rota => {
    this.props.navigation.navigate(rota);
  };

  render() {
    return (
      <List.Section>
        <View style={styles.row}>
          <Avatar.Icon icon="person" style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{this.state.usuario.usuario}</Text>
            <List.Subheader
              style={{marginLeft: 8}}
              onPress={() => this.mudarRota('EditarPerfil')}>
              Editar Perfil
            </List.Subheader>
          </View>
        </View>
        <Divider />
        <List.Item
          title="E-mail"
          description={this.state.usuario.email}
          left={() => <List.Icon color="#F59656" icon="email" />}
        />
        <List.Item
          title="CPF"
          description={this.state.usuario.cpf}
          left={() => <List.Icon color="#F59656" icon="contacts" />}
        />
        <List.Item
          title="Telefone"
          description={this.state.usuario.telefone}
          left={() => <List.Icon color="#F59656" icon="phone" />}
        />
        <List.Item
          title="Endereço"
          description={this.state.usuario.endereco}
          left={() => <List.Icon color="#F59656" icon="map" />}
        />
        <List.Item
          title="Pagamento"
          left={() => <List.Icon color="#F59656" icon="credit-card" />}
        />
        <List.Item
          title="Configurações"
          left={() => <List.Icon color="#F59656" icon="settings" />}
        />
        <List.Item
          title="Sair"
          left={() => <List.Icon color="#F59656" icon="exit-to-app" />}
        />
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  avatar: {marginLeft: 20, marginBottom: 10, marginTop: 10},
  userName: {fontSize: 30, marginLeft: 20, marginTop: 10},
});
