import * as React from 'react';
import { Body, Header, Left, Right, Title } from 'native-base';

export default () => (
  <Header style={{ backgroundColor: '#34baeb' }}>
    <Left />
    <Body>
      <Title style={{ color: '#ffffff' }}>Fetch News</Title>
    </Body>
    <Right />
  </Header>
);
