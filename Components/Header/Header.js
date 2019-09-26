import * as React from 'react';
import {Appbar} from 'react-native-paper';

export default class Header extends React.Component {
  state = {
    title: this.props.title,
    subtitle: this.props.subtitle,
  };

  _goBack = () => console.log('Went back');

  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#FF6700'}}>
        <Appbar.BackAction onPress={this._goBack} color="white" />
        <Appbar.Content
          title={this.state.title}
          subtitle={this.state.subtitle}
          color="white"
        />
      </Appbar.Header>
    );
  }
}
