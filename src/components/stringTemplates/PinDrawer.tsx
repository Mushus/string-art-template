import React, { Fragment } from 'react';
import { DrawOptions } from './types';

interface Props {
  pinPositions: Array<[number, number]>;
  drawOptions: DrawOptions;
}

const PinDrawer = ({ pinPositions, drawOptions }: Props) => {
  return (
    <>
      {pinPositions.map(([x, y], i) => {
        const length = Math.sqrt(x * x + y * y);
        const pinX = length > 0 ? x + (x / length) * 5 : 0;
        const pinY = length > 0 ? y + (y / length) * 5 : 0;
        return (
          <Fragment key={i}>
            {drawOptions.withPinNumber && (
              <text
                x={pinX}
                y={pinY}
                fontSize={3}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {i}
              </text>
            )}
            <circle cx={x} cy={y} r={drawOptions.pinSize} fill="black" />
          </Fragment>
        );
      })}
    </>
  );
};

export default PinDrawer;
