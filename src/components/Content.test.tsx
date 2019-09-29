import * as React from 'react';
import { create } from 'react-test-renderer';
import Content from './Content';

describe('Content', () => {
  test('should render correctly', () => {
    const tree = create(<Content />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
