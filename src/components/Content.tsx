import * as React from 'react';
import { Body, Card, CardItem, Content, Left, Text } from 'native-base';

export default () => (
  <Content padder>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num: number) => (
      <Card
        key={num}
        style={{ marginBottom: 15, marginLeft: 15, marginRight: 15 }}
      >
        <CardItem>
          <Left>
            <Body>
              <Text>
                This is some dummy content going on my card. This is some dummy
                content going on my card. This is some dummy content going on my
                card. This is some dummy content going on my card.
              </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    ))}
  </Content>
);
