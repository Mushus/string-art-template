import {
  PropsCircle,
  PropsPolygon,
  PropsStar,
  Thread,
} from '~/modules/data/current';
import { createFunctionArray } from '~/logic';

export type ThreadDetail = Thread & {
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

export const createThreadMovement = (thread: Thread, pinCount: number) => {
  let positionIndex = thread.start;
  const pinIndexes = [positionIndex];
  const pinShifts: number[] = [];
  const patterns = createFunctionArray(thread.patterns);
  if (patterns && patterns.length > 0) {
    try {
      for (let i = 0; i < thread.loopCount; i++) {
        if (
          i !== 0 &&
          i % patterns.length === 0 &&
          positionIndex === thread.start
        ) {
          break;
        }
        const count = Math.floor(i / patterns.length) + 1;
        let shift = patterns[i % patterns.length](count) | 0;
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

export const generateCircleTemplate = ({
  radius,
  pinNum,
  intervalRatio,
  threads,
}: PropsCircle) => {
  const sidePosition = Math.floor((pinNum - 1) / 2);
  const partitionDistance = new Array(pinNum).fill(null).map((_, i) => {
    if (pinNum <= 2) return 1;
    const a = Math.min(pinNum - 1 - i, i);
    const b = sidePosition - a;
    return (1 * a + intervalRatio * b) / sidePosition;
  });
  const distanceSum = partitionDistance.reduce((a, b) => a + b);
  const round = 2 * Math.PI;
  const unit = round / distanceSum;
  const pinPositions: [number, number][] = [];
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

  const threadsCalc = threads.map<ThreadDetail>((thread) => ({
    ...thread,
    ...createThreadMovement(thread, pinPositions.length),
  }));
  return { pinPositions, threads: threadsCalc };
};

export const generatePolygonTemplate = ({
  radius,
  pinNum,
  vertexNum,
  threads,
}: PropsPolygon) => {
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

  const threadsCalc = threads.map<ThreadDetail>((thread) => ({
    ...thread,
    ...createThreadMovement(thread, pinPositions.length),
  }));
  return { pinPositions, polygonVertexes, threads: threadsCalc };
};

export const generateStarTemplate = ({
  outerRadius,
  innerRadius,
  pinNum,
  vertexNum,
  threads,
}: PropsStar) => {
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

  const threadsCalc = threads.map<ThreadDetail>((thread) => ({
    ...thread,
    ...createThreadMovement(thread, pinPositions.length),
  }));
  return { pinPositions, polygonVertexes, threads: threadsCalc };
};
