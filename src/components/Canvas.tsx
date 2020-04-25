import React from 'react';
import styled from '@emotion/styled';

const SVG = styled.svg<{ w: number; h: number }>`
  display: block;
  width: ${({ w }) => w}mm;
  height: ${({ h }) => h}mm;
`;

interface Props {
  width: number;
  height: number;
  children?: React.ReactNode;
}

export const Canvas = ({ width, height, children }: Props) => {
  return (
    <SVG
      w={width}
      h={height}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
    >
      {children}
    </SVG>
  );
};

export default Canvas;
