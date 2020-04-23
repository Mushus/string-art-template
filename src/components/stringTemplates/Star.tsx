import React from 'react';
import { PropsStar } from '~/modules/canvas/types';
import { createAuxiliaryLines } from './utils';
import PinDrawer from './PinDrawer';
import { DrawOptions } from './types';

type Props = PropsStar & {
  drawOptions: DrawOptions;
};

export default ({
  drawOptions,
  outerRadius,
  innerRadius,
  vertexNum,
  pinNum,
  auxiliaryLines,
}: Props): JSX.Element => {
  const angle = (2 * Math.PI) / (vertexNum * 2);
  const polygonVertexes = new Array(vertexNum * 2)
    .fill(null)
    .map<[number, number]>((_, i) => [
      -Math.sin(i * angle) * (i % 2 === 0 ? outerRadius : innerRadius),
      -Math.cos(i * angle) * (i % 2 === 0 ? outerRadius : innerRadius),
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

  const auxiliaryLineAttrsList = createAuxiliaryLines(
    auxiliaryLines,
    pinPositions
  );

  return (
    <>
      <polygon
        points={polygonPintsAttr}
        fill="none"
        stroke="black"
        strokeWidth={0.1}
      />

      <PinDrawer pinPositions={pinPositions} drawOptions={drawOptions} />
      {auxiliaryLineAttrsList.map(({ points, stroke }, index) => (
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
