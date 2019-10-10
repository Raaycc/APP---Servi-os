import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, ButtonGroup} from 'react-native-elements';

// import { Container } from './styles';

export default function Header({mudarRota, selected}) {
  const buttons = ['Home', 'Chat', 'Contrato', 'Perfil'];

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={buttons}
        onPress={index => mudarRota(buttons[index])}
        selectedIndex={selected}
        containerStyle={{
          height: 70,
          width: '100%',
          backgroundColor: '#FF6700',
        }}
        innerBorderStyle={{width: 0}}
        selectedButtonStyle={{backgroundColor: '#ff7000'}}
        textStyle={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 55,
    width: '100%',
    backgroundColor: '#FF6700',
  },
  button: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
});
