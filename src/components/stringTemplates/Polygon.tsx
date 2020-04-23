import React from 'react';
import { AuxiliaryLine } from '~/modules/canvas/types';
import { createAuxiliaryLines } from './utils';
import PinDrawer from './PinDrawer';

interface Props {
  guideWidth: number;
  pointWidth: number;
  radius: number;
  vertexNum: number;
  pinNum: number;
  auxiliaryLines: AuxiliaryLine[];
}

export default ({
  guideWidth,
  pointWidth,
  radius,
  vertexNum,
  pinNum,
  auxiliaryLines,
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
        strokeWidth={guideWidth}
      />
      <PinDrawer
        pinPositions={pinPositions}
        pointWidth={pointWidth}
        withPinNum={true}
      />
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
