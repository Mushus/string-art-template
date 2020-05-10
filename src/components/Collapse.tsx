import React, { ReactNode, useState } from 'react';
import Measure from 'react-measure';
import styled from '@emotion/styled';

const Wrapper = styled.div<{ height: number }>`
  overflow: hidden;
  transition: height 0.3s;
  height: 0;
  &.isShow {
    height: ${({ height }) => height}px;
  }
`;

const Measures = styled.div`
  overflow: hidden;
`;

interface Props {
  isShow: boolean;
  children?: ReactNode;
}

const Collapse = ({ isShow, children }: Props) => {
  const [height, setHeight] = useState(0);
  return (
    <Wrapper height={height} className={isShow ? 'isShow' : undefined}>
      <Measure
        bounds
        onResize={(contentRect) => {
          const height = Number(contentRect.entry?.height ?? 0);
          setHeight(height);
        }}
      >
        {({ measureRef }) => <Measures ref={measureRef}>{children}</Measures>}
      </Measure>
    </Wrapper>
  );
};

export default Collapse;
