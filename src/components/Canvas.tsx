import React from 'react';
import styled from '@emotion/styled';

interface SVGProps {
  w: number;
  h: number;
  zoomFactor: number;
}

const SVG = styled.svg`
  display: block;
  width: ${({ w, zoomFactor }: SVGProps) => w * zoomFactor}mm;
  height: ${({ h, zoomFactor }: SVGProps) => h * zoomFactor}mm;
  border: 1px solid #ccc;
  background-color: #fff;
  @media print {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ w }: SVGProps) => w}mm;
    height: ${({ h }: SVGProps) => h}mm;
  }
`;

interface Props {
  width: number;
  height: number;
  zoomFactor: number;
  children?: React.ReactNode;
}

export const Canvas = ({ width, height, zoomFactor, children }: Props) => {
  return (
    <SVG
      w={width}
      h={height}
      zoomFactor={zoomFactor}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
    >
      {children}
    </SVG>
  );
};

export default Canvas;
