import React from 'react';
import {Text, View, BackHandler, StyleSheet} from 'react-native';
import {Colors, Searchbar, withTheme} from 'react-native-paper';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    // this.backButtonClick = this.backButtonClick.bind(this);
  }
  componentWillMount = async () => {
    // BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  };

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  backButtonClick = () => {
    return false;
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      theme: {
        colors: {background},
      },
    } = this.props;
    return (
      <>
        <View style={[styles.container, {backgroundColor: background}]}>
          <Searchbar
            placeholder="Search"
            onChangeText={query => this.setState({firstQuery: query})}
            value={this.state.query}
            style={styles.searchbar}
          />
          <Text> FAZER A LISTAGEM DE SERVICOS EM ALTA</Text>
        </View>
      </>
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
});

export default withTheme(Home);
