import React, { useMemo, memo } from 'react';

interface Props {
  vertexes: [number, number][];
}

const PolygonDrawer = memo(({ vertexes }: Props) => {
  const pointAttrs = useMemo(() => vertexes.flatMap((v) => v).join(' '), [
    vertexes,
  ]);
  return (
    <polygon points={pointAttrs} stroke="black" fill="none" strokeWidth={0.1} />
  );
});

export default PolygonDrawer;
