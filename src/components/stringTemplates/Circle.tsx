import React from 'react';
import { AuxiliaryLine } from '~/modules/canvas/types';
import { createAuxiliaryLines } from './utils';

interface Props {
  guideWidth: number;
  pointWidth: number;
  radius: number;
  pinNum: number;
  intervalRatio: number;
  auxiliaryLines: AuxiliaryLine[];
}

export default ({
  guideWidth,
  pointWidth,
  radius,
  pinNum,
  intervalRatio,
  auxiliaryLines,
}: Props): JSX.Element => {
  const side = Math.floor((pinNum - 1) / 2);
  const partitionDistance = new Array(pinNum).fill(null).map((_, i) => {
    if (pinNum <= 2) return 1;
    const a = Math.min(pinNum - 1 - i, i);
    const b = side - a;
    return (1 * a + intervalRatio * b) / side;
  });
  const denominator = partitionDistance.reduce((a, b) => a + b);
  const round = 2 * Math.PI;
  const tick = round / denominator;
  let currentRadius = 0;
  const pinPositions: [number, number][] = [];
  partitionDistance.forEach((d) => {
    pinPositions.push([
      -Math.sin(currentRadius) * radius,
      -Math.cos(currentRadius) * radius,
    ]);
    currentRadius += d * tick;
  });

  const auxiliaryLineAttrsList = createAuxiliaryLines(
    auxiliaryLines,
    pinPositions
  );

  return (
    <>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth={guideWidth}
      />
      {pinPositions.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={x} cy={y} r={pointWidth} fill="black" />
      ))}
      {auxiliaryLineAttrsList.map(({ points, stroke }, index) => (
        <polyline
          key={index}
          points={points}
          stroke={stroke}
          fill="none"
          strokeWidth={guideWidth}
        />
      ))}
    </>
  );
};
