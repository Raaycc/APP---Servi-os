import * as React from 'react';
import {Appbar} from 'react-native-paper';

export default class Header extends React.Component {
  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');

  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#FF6700'}}>
        <Appbar.BackAction onPress={this._goBack} color="white" />
        <Appbar.Content
          title="Título do Header"
          subtitle="Subtítulo do Header"
          color="white"
        />
        <Appbar.Action icon="search" onPress={this._onSearch} color="white" />
        <Appbar.Action icon="more-vert" onPress={this._onMore} color="white" />
      </Appbar.Header>
    );
  }
}
