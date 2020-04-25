import { Thread } from '~/modules/data/current';
import { createThreadMovement } from '~/modules/editor/templateGenerator';

export const createThreads = (
  threads: Thread[],
  pinPositions: [number, number][]
) => {
  const threadAttrsList = threads.map((thread) => {
    const threadsPoint = createThreadMovement(
      thread,
      pinPositions.length
    ).pinIndexes.map((pinIndex) => pinPositions[pinIndex]);
    const threadPointAttrs = threadsPoint.flatMap((v) => v).join(' ');
    return { stroke: thread.color, points: threadPointAttrs };
  });
  return threadAttrsList;
};
