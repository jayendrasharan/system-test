import React from 'react';
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';

import TabPanel from '../index';

describe('<TabPanel />', () => {
  const props = {
    tabId: 'default-tab',
  };
  let TabPanelComponent = '';
  beforeEach(() => {
    TabPanelComponent = shallow(<TabPanel {...props}>Test</TabPanel>);
  });

  test('should render correctly', () => {
    expect(TabPanelComponent).toMatchSnapshot();
  });
});
