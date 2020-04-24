export const generateCircleTemplate = (
  radius: number,
  pinNum: number,
  intervalRatio: number
) => {
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
  return { pinPositions };
};

export const generatePolygonTemplate = (
  radius: number,
  pinNum: number,
  vertexNum: number
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

export const generateStarTempalte = (
  outerRadius: number,
  innerRadius: number,
  pinNum: number,
  vertexNum: number
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
