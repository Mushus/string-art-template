import React from 'react';
import { storiesOf } from '@storybook/react';
import StringTemplateCircle from '~/components/stringTemplates/Circle';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withTests } from '@storybook/addon-jest';
import results from '@/.jest-test-results.json';

storiesOf('StringTemplateCircle', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo)
  .addDecorator(withTests({ results }))
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add(
    'with text',
    () => {
      const guideWidth = number('guideWidth', 0.1, { min: 0 });
      const pointWidth = number('pointWidth', 1, { min: 0 });
      const radius = number('radius', 50);
      const intervalRatio = number('intervalRatio', 1.5);
      const pinNum = number('pinNum', 31, { min: 1 });
      return (
        <svg width={100} height={100} viewBox="-55 -55 110 110">
          <StringTemplateCircle
            guideWidth={guideWidth}
            pointWidth={pointWidth}
            radius={radius}
            pinNum={pinNum}
            intervalRatio={intervalRatio}
            auxiliaryLines={[]}
          />
        </svg>
      );
    },
    {}
  );
