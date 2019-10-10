import * as React from 'react';
import {Appbar} from 'react-native-paper';

export default class Header extends React.Component {
  state = {
    title: this.props.title,
    subtitle: this.props.subtitle,
  };

  _goBack = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#FF6700'}}>
        <Appbar.BackAction
          onPress={() => this.props.mudarRota()}
          color="white"
        />
        <Appbar.Content
          title={this.state.title}
          subtitle={this.state.subtitle}
          color="white"
        />
      </Appbar.Header>
    );
  }
}
