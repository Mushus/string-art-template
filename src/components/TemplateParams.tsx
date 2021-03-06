import React, { memo } from 'react';
import ThreadColor from './ThreadColor';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { TemplateProps, ThreadProps } from '~/modules/data/internal';
import ShapeTemplates from '~/constants/shapeTemplates';

const Wrapper = styled.div`
  font-size: 2.5mm;
  min-width: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2mm;
`;

const ThreadWrapper = styled.div<{ index: number }>`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1mm;
  ${({ index }) =>
    index > 0
      ? css`
          border-top: none;
        `
      : css`
          margin-top: 1mm;
        `}
`;

interface Props {
  template: TemplateProps;
  threads: { [k: string]: ThreadProps };
}

const TemplateParams = memo(({ template, threads }: Props) => {
  if (template.type === 'none') return null;
  return (
    <Wrapper>
      <div>
        形状: {ShapeTemplates.find((t) => t.key === template.type)?.name}
      </div>
      {template.type == 'circle' && (
        <>
          <div>大きさ: {template.radius}mm</div>
          <div>ピン数: {template.pinNum}</div>
          <div>寄せる比率: {template.intervalRatio}</div>
        </>
      )}
      {template.type == 'polygon' && (
        <>
          <div>大きさ: {template.radius}mm</div>
          <div>頂点数: {template.vertexNum}角形</div>
          <div>1辺のピン数: {template.pinNum}</div>
        </>
      )}
      {template.type == 'star' && (
        <>
          <div>大きさ1: {template.outerRadius}mm</div>
          <div>大きさ2: {template.innerRadius}mm</div>
          <div>頂点数: {template.vertexNum}角形</div>
          <div>1辺のピン数: {template.pinNum}</div>
        </>
      )}
      {template.threads.map((threadID, i) => {
        const { id, color, start, patterns, loopCount } = threads[threadID];
        return (
          <ThreadWrapper key={id} index={i}>
            <div>
              色: <ThreadColor color={color} />
            </div>
            <div>開始位置: {start}</div>
            <div>パターン: ({patterns.join(', ')})</div>
            <div>繰り返す回数: {loopCount}</div>
          </ThreadWrapper>
        );
      })}
    </Wrapper>
  );
});

export default TemplateParams;
