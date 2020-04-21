import React from 'react';
import Canvas from '~/components/Canvas';
import { useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import Selector from '~/components/stringTemplates/Selector';

const selector = (state: RootState) => state.canvas;

const Preview = () => {
  const {
    templates,
    page: { width, height, zoomFactor },
  } = useSelector(selector);

  return (
    <Canvas width={width} height={height} zoomFactor={zoomFactor}>
      {templates.map((props, i) => (
        <Selector key={i} {...props} />
      ))}
    </Canvas>
  );
};

export default Preview;
