import React from 'react';
import { PropsCircle } from '~/modules/data/current';
import { createThreads } from './utils';
import PinDrawer from './PinDrawer';
import { DrawOptions } from './types';

type Props = PropsCircle & {
  drawOptions: DrawOptions;
};

export default ({
  drawOptions,
  radius,
  pinNum,
  intervalRatio,
  threads,
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

  const threadAttrsList = createThreads(threads, pinPositions);

  return (
    <>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth={0.1}
      />
      <PinDrawer pinPositions={pinPositions} drawOptions={drawOptions} />
      {threadAttrsList.map(({ points, stroke }, index) => (
        <polyline
          key={index}
          points={points}
          stroke={stroke}
          fill="none"
          strokeWidth={0.1}
        />
      ))}
    </>
  );
};
