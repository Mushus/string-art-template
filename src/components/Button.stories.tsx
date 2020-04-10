import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '~/components/Button';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withTests } from '@storybook/addon-jest';
import results from '@/.jest-test-results.json';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .addDecorator(withTests({ results }))
  .addParameters({
    info: {
      inline: true
    }
  })
  .add(
    'with text',
    () => {
      const label = text('label', 'Hello Button');
      return <Button>{label}</Button>;
    },
    {
      jest: ['Button'],
    }
  );
