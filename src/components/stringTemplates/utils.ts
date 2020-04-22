import { AuxiliaryLine } from '~/modules/canvas';
import { createFunctionArray } from '~/logic';

export const createAuxiliaryLines = (
  auxiliaryLines: AuxiliaryLine[],
  pinPositions: [number, number][]
) => {
  const auxiliaryLineAttrsList = auxiliaryLines.map((line) => {
    let positionIndex = line.start;
    const auxiliaryLinesPoint = [pinPositions[positionIndex]];
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
          auxiliaryLinesPoint.push(pinPositions[positionIndex]);

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
    const auxiliaryLinePointAttrs = auxiliaryLinesPoint
      .flatMap((v) => v)
      .join(' ');
    return { stroke: line.color, points: auxiliaryLinePointAttrs };
  });
  return auxiliaryLineAttrsList;
};
