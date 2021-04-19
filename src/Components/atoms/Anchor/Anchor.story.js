import React from 'react';
import { storiesOf } from '@storybook/react';

import { defaultAnchor, secondaryAnchor } from './Anchor.mock';
import Anchor from '.';

// $FlowFixMe eslint-disable-next-line extra-rules/no-commented-out-code
storiesOf('Atoms', module).addWithChapters('Anchor', {
  chapters: [
    {
      sections: [
        {
          sectionFn: () => (
            <Anchor
              {...defaultAnchor}
              className={`hide-default-sample ${defaultAnchor.className}`}
            >
              Home
            </Anchor>
          ),
          options: {
            showSource: true,
            allowSourceToggling: true,
            showPropTables: true,
            allowPropTablesToggling: true,
          },
        },
      ],
    },
    {
      title: 'Primary Anchor Variations',
      sections: [
        {
          title: 'Default Link',
          sectionFn: () => <Anchor {...defaultAnchor}>Submit</Anchor>,
        },
        {
          title: 'Secondary Link',
          sectionFn: () => <Anchor {...secondaryAnchor}>Submit</Anchor>,
        },
      ],
    },
  ],
});
