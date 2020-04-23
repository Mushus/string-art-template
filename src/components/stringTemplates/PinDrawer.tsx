import React, { Fragment } from 'react';
import { DrawOptions } from './types';

interface Props {
  pinPositions: Array<[number, number]>;
  drawOptions: DrawOptions;
}

const PinDrawer = ({ pinPositions, drawOptions }: Props) => {
  return (
    <>
      {pinPositions.map(([x, y], i) => (
        <Fragment key={i}>
          {drawOptions.withPinNumber && (
            <text x={x + 2} y={y} fontSize={3}>
              {i + 1}
            </text>
          )}
          <circle cx={x} cy={y} r={drawOptions.pinSize} fill="black" />
        </Fragment>
      ))}
    </>
  );
};

export default PinDrawer;
