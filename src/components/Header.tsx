import * as React from 'react';
import { Header } from 'react-native-elements';

export default () => {
  return (
    <Header
      placement="left"
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'Fetch News', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      backgroundColor="#3fa7fc"
    />
  );
};
