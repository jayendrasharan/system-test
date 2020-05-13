import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('Input Component', () => {
  let inputRender = '';

  test('should render correctly', () => {
    inputRender = shallow(<Input value="abc" />);
    expect(inputRender).toMatchSnapshot();
  });
});
