import React from 'react';
import { shallow } from 'enzyme';

import Anchor from '../Anchor';

describe('Anchor Component', () => {
  let anchor;

  test('should render correctly and match snapshot', () => {
    const props = {
      children: 'Sample',
      to: '/',
      onClick: () => {},
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with object destination', () => {
    const props = {
      children: 'Sample',
      to: {
        pathname: 'http://abc.com',
        query: {
          a: 1,
          b: 2,
        },
      },
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with object destination and no query param', () => {
    const props = {
      children: 'Sample',
      to: {
        pathname: 'http://abc.com',
        query: null,
      },
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with icons after true', () => {
    const props = {
      children: 'Sample',
      to: '/',
      iconProps: {
        type: 'arrow-right',
        className: 'icon',
      },
      isIconAfterContent: true,
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with icons after false', () => {
    const props = {
      children: 'Sample',
      to: '/',
      iconProps: {
        type: 'arrow-right',
        className: 'icon',
      },
      isIconAfterContent: false,
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with icons after true', () => {
    const props = {
      children: 'Sample',
      to: '/',
      iconProps: {
        type: 'arrow-right',
        className: 'icon',
      },
      iconOnly: true,
      isIconAfterContent: true,
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
  test('should render correctly and match snapshot with icons after true', () => {
    const props = {
      children: 'Sample',
      to: '/',
      iconProps: {
        type: 'arrow-right',
        className: 'icon',
      },
      iconOnly: true,
      isIconAfterContent: false,
    };
    anchor = shallow(<Anchor {...props} />);
    expect(anchor).toMatchSnapshot();
  });
});
