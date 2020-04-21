import { AuxiliaryLine } from '~/modules/canvas';

export const createAuxiliaryLines = (
  auxiliaryLines: AuxiliaryLine[],
  pinPositions: [number, number][]
) => {
  const auxiliaryLineAttrsList = auxiliaryLines.map((line) => {
    let positionIndex = line.start;
    const auxiliaryLinesPoint = [pinPositions[positionIndex]];
    const patterns = line.patterns;
    for (let i = 0; i < 1000; i++) {
      const skip = patterns[i % patterns.length];
      positionIndex += skip;
      if (skip === 0) break;
      while (positionIndex < 0) positionIndex += pinPositions.length;
      while (positionIndex >= pinPositions.length)
        positionIndex -= pinPositions.length;
      auxiliaryLinesPoint.push(pinPositions[positionIndex]);
      if (i !== 0 && i % patterns.length === 0 && positionIndex === 0) break;
    }
    const auxiliaryLinePointAttrs = auxiliaryLinesPoint
      .flatMap((v) => v)
      .join(' ');
    return { stroke: line.color, points: auxiliaryLinePointAttrs };
  });
  return auxiliaryLineAttrsList;
};
