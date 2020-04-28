import React, { useMemo, memo } from 'react';
import { createThreadMovement } from '~/modules/editor/templateGenerator';
import { ThreadProps } from '~/modules/data/internal';

interface Props {
  thread: ThreadProps;
  pinPositions: [number, number][];
}

const ThreadDrawer = memo(({ thread, pinPositions }: Props) => {
  const pinCount = pinPositions.length;
  const { pinIndexes } = useMemo(
    () =>
      createThreadMovement(
        thread.start,
        thread.loopCount,
        thread.patterns,
        pinCount
      ),
    [thread.start, thread.loopCount, thread.patterns, pinCount]
  );
  const threadPointAttrs = useMemo(
    () =>
      pinIndexes
        .map((pinIndex) => pinPositions[pinIndex])
        .flatMap((v) => v)
        .join(' '),
    [pinPositions, pinIndexes]
  );
  return (
    <polyline
      points={threadPointAttrs}
      stroke={thread.color}
      fill="none"
      strokeWidth={0.1}
    />
  );
});

export default ThreadDrawer;
