import React from 'react';
import { shallow } from 'enzyme';

import Textarea from '../index';

describe('<Textarea />', () => {
  let TextareaComponent = '';
  beforeEach(() => {
    TextareaComponent = shallow(<Textarea />);
  });

  test('should render correctly', () => {
    expect(TextareaComponent).toMatchSnapshot();
  });
});
