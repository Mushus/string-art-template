import React from 'react';
import { PropsPolygon } from '~/modules/data/current';
import { createThreads } from './utils';
import PinDrawer from './PinDrawer';
import { DrawOptions } from './types';

type Props = PropsPolygon & {
  drawOptions: DrawOptions;
};

export default ({
  drawOptions,
  radius,
  vertexNum,
  pinNum,
  threads,
}: Props): JSX.Element => {
  const angle = (2 * Math.PI) / vertexNum;
  const polygonVertexes = new Array(vertexNum)
    .fill(null)
    .map<[number, number]>((_, i) => [
      -Math.sin(i * angle) * radius,
      -Math.cos(i * angle) * radius,
    ]);
  const polygonPintsAttr = polygonVertexes.flatMap((v) => v).join(' ');
  const pinPositions: [number, number][] = [];
  polygonVertexes.forEach((v, i) => {
    const [sx, sy] = v;
    const [ex, ey] = polygonVertexes[(i + 1) % polygonVertexes.length];
    for (let k = 0; k < pinNum; k++) {
      const a = k / pinNum;
      const b = 1 - a;
      pinPositions.push([sx * b + ex * a, sy * b + ey * a]);
    }
  });

  const threadAttrsList = createThreads(threads, pinPositions);

  return (
    <>
      <polygon
        points={polygonPintsAttr}
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
