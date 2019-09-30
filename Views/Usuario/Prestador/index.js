import React from 'react';
import {View, BackHandler, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Colors,
  List,
  Text,
  Chip,
  Divider,
  withTheme,
  IconButton,
} from 'react-native-paper';

class Prestador extends React.Component {
  render() {
    console.log('PRESTADORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
    const {
      theme: {
        colors: {background},
      },
    } = this.props;
    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});

export default withTheme(Prestador);
