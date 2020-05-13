import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  primaryButton,
  primaryButtonDisabled,
  secondaryButton,
  secondaryButtonDisabled,
} from './Button.mock';
import Button from '.';

// $FlowFixMe eslint-disable-next-line extra-rules/no-commented-out-code
storiesOf('Atoms', module)
  .add('Button Knobs', () => (
    <Button {...primaryButton} className={primaryButton.className}>
      Submit
    </Button>
  ))
  .addWithChapters('Buttons', {
    chapters: [
      {
        sections: [
          {
            sectionFn: () => (
              <Button
                {...primaryButton}
                className={`hide-default-sample ${primaryButton.className}`}
              >
                Submit
              </Button>
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
        title: 'Primary Button Variations',
        sections: [
          {
            title: 'Default',
            sectionFn: () => <Button {...primaryButton}>Submit</Button>,
          },
          {
            title: 'Disabled',
            sectionFn: () => <Button {...primaryButtonDisabled}>Submit</Button>,
          },
        ],
      },
      {
        title: 'Secondary Button Variations',
        sections: [
          {
            title: 'Default',
            sectionFn: () => <Button {...secondaryButton}>Submit</Button>,
          },
          {
            title: 'Disabled',
            sectionFn: () => (
              <Button {...secondaryButtonDisabled}>Submit</Button>
            ),
          },
        ],
      },
    ],
  });
