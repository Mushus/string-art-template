import { Thread } from '~/modules/data/current';
import { createFunctionArray } from '~/logic';

export const createThreads = (
  threads: Thread[],
  pinPositions: [number, number][]
) => {
  const threadAttrsList = threads.map((line) => {
    let positionIndex = line.start;
    const threadsPoint = [pinPositions[positionIndex]];
    const patterns = createFunctionArray(line.patterns);
    if (patterns && patterns.length > 0) {
      try {
        for (let i = 0; i < line.loopCount; i++) {
          const count = Math.floor(i / patterns.length) + 1;
          const skip = patterns[i % patterns.length](count);
          positionIndex += skip;
          if (skip === 0) break;

          while (positionIndex < 0) positionIndex += pinPositions.length;
          while (positionIndex >= pinPositions.length)
            positionIndex -= pinPositions.length;
          threadsPoint.push(pinPositions[positionIndex]);

          if (
            i !== 0 &&
            i % patterns.length === 0 &&
            positionIndex === line.start
          )
            break;
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
    const threadPointAttrs = threadsPoint.flatMap((v) => v).join(' ');
    return { stroke: line.color, points: threadPointAttrs };
  });
  return threadAttrsList;
};
