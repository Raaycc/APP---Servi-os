import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Avatar, Divider, Text} from 'react-native-paper';

export default class Perfil extends React.Component {
  render() {
    return (
      <List.Section>
        <View style={styles.row}>
          <Avatar.Icon icon="person" style={styles.avatar} />
          <View>
            <Text style={styles.userName}>João Kleber</Text>
            <List.Subheader style={{marginLeft: 8}}>
              Editar Perfil
            </List.Subheader>
          </View>
        </View>
        <Divider />
        <List.Item
          title="E-mail"
          description="joaokleber@gmail.com"
          left={() => <List.Icon color="#F59656" icon="email" />}
        />
        <List.Item
          title="CPF"
          description="123.456.789-12"
          left={() => <List.Icon color="#F59656" icon="contacts" />}
        />
        <List.Item
          title="Telefone"
          description="(88) 9 98987676"
          left={() => <List.Icon color="#F59656" icon="phone" />}
        />
        <List.Item
          title="Endereço"
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
