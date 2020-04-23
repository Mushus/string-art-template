import React, { Fragment } from 'react';

interface Props {
  pinPositions: Array<[number, number]>;
  pointWidth: number;
  withPinNum: boolean;
}

const PinDrawer = ({ pinPositions, pointWidth, withPinNum = false }: Props) => {
  return (
    <>
      {pinPositions.map(([x, y], i) => (
        <Fragment key={i}>
          {withPinNum && (
            <text x={x + 2} y={y} fontSize={3}>
              {i + 1}
            </text>
          )}
          <circle
            key={`${i} ${x},${y}`}
            cx={x}
            cy={y}
            r={pointWidth}
            fill="black"
          />
        </Fragment>
      ))}
    </>
  );
};

export default PinDrawer;
