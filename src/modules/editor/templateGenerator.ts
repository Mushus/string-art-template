import {
  PropsCircle,
  PropsPolygon,
  PropsStar,
  ThreadProps,
} from '~/modules/data/internal';
import { createFunctionArray } from '~/logic';

export type ThreadDetail = ThreadProps & {
  pinIndexes: number[];
  pinShifts: number[];
};

const normalizePinNumber = (threadNumber: number, pinCount: number) => {
  while (threadNumber < 0) {
    threadNumber += pinCount;
  }
  while (threadNumber >= pinCount) {
    threadNumber -= pinCount;
  }
  return threadNumber;
};

export const createThreadMovement = (
  start: number,
  loopCount: number,
  patterns: string[],
  pinCount: number
) => {
  let positionIndex = start;
  const pinIndexes = [positionIndex];
  const pinShifts: number[] = [];
  const patternFuncs = createFunctionArray(patterns);
  if (patternFuncs && patternFuncs.length > 0) {
    try {
      for (let i = 0; i < loopCount; i++) {
        if (i !== 0 && i % patterns.length === 0 && positionIndex === start) {
          break;
        }
        const count = Math.floor(i / patternFuncs.length) + 1;
        let shift = patternFuncs[i % patternFuncs.length](count) | 0;
        if (
          typeof shift !== 'number' ||
          Number.isNaN(shift) ||
          !Number.isFinite(shift)
        ) {
          continue;
        }

        pinShifts.push(shift);

        const prevPositionIndex = positionIndex;
        positionIndex += shift;
        positionIndex = normalizePinNumber(positionIndex, pinCount);
        if (prevPositionIndex != positionIndex) {
          pinIndexes.push(positionIndex);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  return { pinIndexes, pinShifts };
};

export const generateCircleTemplate = (
  radius: PropsCircle['radius'],
  pinNum: PropsCircle['pinNum'],
  intervalRatio: PropsCircle['intervalRatio']
) => {
  const sidePosition = Math.floor((pinNum - 1) / 2);
  const partitionDistance = new Array(pinNum).fill(null).map((_, i) => {
    if (pinNum <= 2) return 1;
    const a = Math.min(pinNum - 1 - i, i);
    const b = sidePosition - a;
    return (1 * a + intervalRatio * b) / sidePosition;
  });
  const distanceSum = partitionDistance.reduce((a, b) => a + b, 0);
  const pinPositions: [number, number][] = [];
  if (distanceSum > 0) {
    const round = 2 * Math.PI;
    const unit = round / distanceSum;
    {
      let currentAngle = 0;
      partitionDistance.forEach((d) => {
        pinPositions.push([
          -Math.sin(currentAngle) * radius,
          -Math.cos(currentAngle) * radius,
        ]);
        currentAngle += d * unit;
      });
    }
  }
  return pinPositions;
};

export const generatePolygonTemplate = (
  radius: PropsPolygon['radius'],
  pinNum: PropsPolygon['pinNum'],
  vertexNum: PropsPolygon['vertexNum']
) => {
  const angle = (2 * Math.PI) / vertexNum;
  const polygonVertexes = new Array(vertexNum)
    .fill(null)
    .map<[number, number]>((_, i) => [
      -Math.sin(i * angle) * radius,
      -Math.cos(i * angle) * radius,
    ]);
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

  return { pinPositions, polygonVertexes };
};

export const generateStarTemplate = (
  outerRadius: PropsStar['outerRadius'],
  innerRadius: PropsStar['innerRadius'],
  pinNum: PropsStar['pinNum'],
  vertexNum: PropsStar['outerRadius']
) => {
  const angle = (2 * Math.PI) / (vertexNum * 2);
  const polygonVertexes = new Array(vertexNum * 2)
    .fill(null)
    .map<[number, number]>((_, i) => [
      -Math.sin(i * angle) * (i % 2 === 0 ? outerRadius : innerRadius),
      -Math.cos(i * angle) * (i % 2 === 0 ? outerRadius : innerRadius),
    ]);
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

  return { pinPositions, polygonVertexes };
};
