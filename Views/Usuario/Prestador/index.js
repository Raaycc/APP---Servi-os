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
import Header from '../../../Components/Header/Header';

class Prestador extends React.Component {
  render() {
    const {
      theme: {
        colors: {background},
      },
    } = this.props;
    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <Header />
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.row}>
              <Avatar.Image
                size={100}
                source={require('../../../assets/real-estate.png')}
              />
              <Text style={styles.userName}>Nome do Prestador</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text>Descrição</Text>
          </View>
          <View>
            <Card style={styles.card}>
              <Card.Title
                title="Serviço"
                subtitle="R$ "
                left={props => <Avatar.Icon {...props} icon="folder" />}
              />
              <Card.Content>
                <Paragraph>Descrição do serviço</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Exibir todos</Button>
                <Button>Contratar</Button>
              </Card.Actions>
            </Card>
          </View>
          <View style={styles.row}>
            <Text>Avaliações</Text>
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
  header: {
    padding: 20,
    backgroundColor: '#FF6700',
    height: 150,
  },
  userName: {fontSize: 30, marginLeft: 20, marginTop: 10, color: '#fff'},
  card: {margin: 20},
});

export default withTheme(Prestador);
