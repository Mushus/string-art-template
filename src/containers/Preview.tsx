import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import Canvas from '~/components/Canvas';
import Selector from '~/components/stringTemplates/Selector';
import styled from '@emotion/styled';
import { getZooms } from '~/modules/page';

const Wapper = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 100;
  background-color: #eee;
  @media print {
    display: unset;
    padding: 0;
    width: auto;
    height: auto;
    background: transparent;
  }
`;
const Zoomer = styled.div<{ zoomFactor: number }>`
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(${({ zoomFactor }) => zoomFactor});
  transform-origin: 0 0;
  padding: 100px;
  @media print {
    position: unset;
    top: unset;
    left: unset;
    padding: 0;
    transform: unset;
  }
`;
const Page = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}mm;
  height: ${({ height }) => height - 1}mm;
  border: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden;
  :not(:last-child) {
    page-break-after: always;
    margin-bottom: 100px;
  }
  @media print {
    margin: 0;
    padding: 0;
    border: unset;
    background: transparent;
  }
`;

const selector = ({ page, printOptions, editor }: RootState) => ({
  editor,
  zooms: getZooms(page),
  printOptions,
});

const Preview = () => {
  const { zooms, printOptions, editor } = useSelector(selector);
  const { templates } = editor.data;
  const { withPinNumber, pinSize } = printOptions;
  const { width, height, zoomFactor } = zooms;
  const drawOptions = useMemo(() => ({ withPinNumber, pinSize }), [
    withPinNumber,
    pinSize,
  ]);
  return (
    <Wapper>
      <Zoomer zoomFactor={zoomFactor}>
        <Page width={width} height={height} color="red">
          <Canvas width={width} height={height}>
            {templates.map((props, i) => (
              <Selector key={i} drawOptions={drawOptions} {...props} />
            ))}
          </Canvas>
        </Page>
      </Zoomer>
    </Wapper>
  );
};

export default Preview;
