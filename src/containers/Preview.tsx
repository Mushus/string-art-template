import React, { useMemo } from 'react';
import Canvas from '~/components/Canvas';
import { useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import Selector from '~/components/stringTemplates/Selector';

const selector = ({ canvas, printOptions }: RootState) => ({
  canvas,
  printOptions,
});

const Preview = () => {
  const { canvas, printOptions } = useSelector(selector);
  const { withPinNumber, pinSize } = printOptions;
  const { templates, page } = canvas;
  const { width, height, zoomFactor } = page;
  const drawOptions = useMemo(() => ({ withPinNumber, pinSize }), [
    withPinNumber,
    pinSize,
  ]);
  return (
    <Canvas width={width} height={height} zoomFactor={zoomFactor}>
      {templates.map((props, i) => (
        <Selector key={i} drawOptions={drawOptions} {...props} />
      ))}
    </Canvas>
  );
};

export default Preview;
