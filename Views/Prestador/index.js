import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import {
    Colors
  } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
// import { Container } from './styles';

export default class Prestador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    // this.backButtonClick = this.backButtonClick.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

    mudarRota = (rota, prestador) => {
        this.props.navigation.navigate(rota, {
          prestador,
        });
      };

    render() {  
        return ( 
        <View style={{flex: 1}}>
            <View style={[styles.container, {backgroundColor: '#fff', flex: 1}]}>
                <Text>Prestador</Text>
            </View>
            <Header mudarRota={rota => this.mudarRota(rota)} selected={0} />
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
