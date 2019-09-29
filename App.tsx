import * as React from 'react';
import { Container } from 'native-base';
import Header from './src/components/Header';
import Content from './src/components/Content';

export default () => (
  <Container>
    <Header />
    <Content />
  </Container>
);
