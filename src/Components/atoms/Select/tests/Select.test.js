import React from 'react';
import { shallow } from 'enzyme';
import Select from '../Select';

describe('Select Component', () => {
  let input = '';

  test('should render correctly', () => {
    input = shallow(<Select options={['Option 1', 'Option 2']} />);
    expect(input).toMatchSnapshot();
  });
  test('should render with placeholder', () => {
    input = shallow(
      <Select placeholder="test" options={['Option 1', 'Option 2']} />
    );
    expect(input).toMatchSnapshot();
  });
});
