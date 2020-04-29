import React, { useMemo, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import Canvas from '~/components/Canvas';
import styled from '@emotion/styled';
import { getPages } from '~/modules/page';
import ThreadColor from '~/components/ThreadColor';
import TemplateParams from '~/components/TemplateParams';
import {
  TemplateProps,
  ThreadProps,
  PropsCircle,
  PropsStar,
  PropsPolygon,
  ValidTemplateProps,
} from '~/modules/data/internal';
import { DrawOptions } from '~/components/threadTemplates/types';
import ThreadDrawer from '~/components/threadTemplates/ThreadDrawer';
import {
  generateCircleTemplate,
  generatePolygonTemplate,
  generateStarTemplate,
  createThreadMovement,
} from '~/modules/editor/templateGenerator';
import PinDrawer from '~/components/threadTemplates/PinDrawer';
import PolygonDrawer from '~/components/threadTemplates/PolygonDrawer';
import ShapeTemplates from '~/constants/shapeTemplates';

const PrintStyleId = 'printStyle';

export const chunked = <T extends any>(ary: Array<T>, size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < ary.length; i += size) {
    result.push(ary.slice(i, i + size));
  }
  return result;
};

interface SelectorProps {
  templateProps: ValidTemplateProps;
  drawOptions: DrawOptions;
  threadsDict: { [key: string]: ThreadProps };
}

interface ShapeProps<T extends TemplateProps> {
  templateProps: T;
  drawOptions: DrawOptions;
  threads: ThreadProps[];
}

const Circle = memo(
  ({ templateProps, drawOptions, threads }: ShapeProps<PropsCircle>) => {
    const { radius, pinNum, intervalRatio } = templateProps;
    const generateTemplateArgs: Parameters<typeof generateCircleTemplate> = [
      radius,
      pinNum,
      intervalRatio,
    ];
    const pinPositions = useMemo(
      () => generateCircleTemplate(...generateTemplateArgs),
      generateTemplateArgs
    );
    return (
      <>
        <circle
          cx={0}
          cy={0}
          r={radius}
          fill="none"
          stroke="black"
          strokeWidth={0.1}
        />
        <PinDrawer pinPositions={pinPositions} drawOptions={drawOptions} />
        {threads.map((thread) => (
          <ThreadDrawer
            key={thread.id}
            thread={thread}
            pinPositions={pinPositions}
          />
        ))}
      </>
    );
  }
);

const Polygon = memo(
  ({ templateProps, drawOptions, threads }: ShapeProps<PropsPolygon>) => {
    const { radius, pinNum, vertexNum } = templateProps;
    const generateTemplateArgs: Parameters<typeof generatePolygonTemplate> = [
      radius,
      pinNum,
      vertexNum,
    ];
    const { pinPositions, polygonVertexes } = useMemo(
      () => generatePolygonTemplate(...generateTemplateArgs),
      generateTemplateArgs
    );
    return (
      <>
        <PolygonDrawer vertexes={polygonVertexes} />
        <PinDrawer pinPositions={pinPositions} drawOptions={drawOptions} />
        {threads.map((thread) => (
          <ThreadDrawer
            key={thread.id}
            thread={thread}
            pinPositions={pinPositions}
          />
        ))}
      </>
    );
  }
);

const Star = memo(
  ({ templateProps, drawOptions, threads }: ShapeProps<PropsStar>) => {
    const { outerRadius, innerRadius, pinNum, vertexNum } = templateProps;
    const generateTemplateArgs: Parameters<typeof generateStarTemplate> = [
      outerRadius,
      innerRadius,
      pinNum,
      vertexNum,
    ];
    const { pinPositions, polygonVertexes } = useMemo(
      () => generateStarTemplate(...generateTemplateArgs),
      generateTemplateArgs
    );
    return (
      <>
        <PolygonDrawer vertexes={polygonVertexes} />
        <PinDrawer pinPositions={pinPositions} drawOptions={drawOptions} />
        {threads.map((thread) => (
          <ThreadDrawer
            key={thread.id}
            thread={thread}
            pinPositions={pinPositions}
          />
        ))}
      </>
    );
  }
);

const Selector = memo(
  ({ templateProps, drawOptions, threadsDict }: SelectorProps) => {
    const threads = templateProps.threads.map((id) => threadsDict[id]);
    switch (templateProps.type) {
      case 'circle':
        return (
          <Circle
            templateProps={templateProps}
            drawOptions={drawOptions}
            threads={threads}
          />
        );
      case 'polygon':
        return (
          <Polygon
            templateProps={templateProps}
            drawOptions={drawOptions}
            threads={threads}
          />
        );
      case 'star':
        return (
          <Star
            templateProps={templateProps}
            drawOptions={drawOptions}
            threads={threads}
          />
        );
      default:
        return null;
    }
  }
);

interface ProcedureProps {
  template: TemplateProps;
  thread: ThreadProps;
  chunkSize: number;
  headers: JSX.Element[];
}

const Procedure = ({
  template,
  thread,
  chunkSize,
  headers,
}: ProcedureProps) => {
  const { start, loopCount, patterns } = thread;
  let pinCount = 1;
  // TODO: 外に出す
  switch (template.type) {
    case 'circle':
      pinCount = template.pinNum;
      break;
    case 'polygon': {
      const { pinNum, vertexNum } = template;
      pinCount = pinNum * vertexNum;
      break;
    }
    case 'star': {
      const { pinNum, vertexNum } = template;
      pinCount = pinNum * vertexNum * 2;
      break;
    }
  }
  const attrs: Parameters<typeof createThreadMovement> = [
    start,
    loopCount,
    patterns,
    pinCount,
  ];
  const { pinIndexes } = useMemo(() => createThreadMovement(...attrs), attrs);
  return (
    <>
      <h1>手順</h1>
      <h2>
        {ShapeTemplates.find((s) => s.key === template.type)?.name}
        糸
        <ThreadColor color={thread.color} />
      </h2>
      <p>表は左上から横に読みます。</p>
      <p>テンプレートの対応する数字のピンに紐を掛けます。</p>
      <Table>
        <thead>
          <TableRow>{headers}</TableRow>
        </thead>
        <tbody>
          {chunked(pinIndexes, chunkSize).map((row, i) => (
            <TableRow key={i}>
              <TableHead>{i * chunkSize}</TableHead>
              {row.map((data, i) => (
                <TableData key={i}>{data}</TableData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

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
    overflow: visible;
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
  position: relative;
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

const Position = styled.div<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: number;
  height?: number;
}>`
  position: absolute;
  top: ${({ top }) => (top != null ? `${top}mm` : 'unset')};
  bottom: ${({ bottom }) => (bottom != null ? `${bottom}mm` : 'unset')};
  left: ${({ left }) => (left != null ? `${left}mm` : 'unset')};
  right: ${({ right }) => (right != null ? `${right}mm` : 'unset')};
  width: ${({ width }) => (width != null ? `${width}mm` : 'unset')};
  height: ${({ height }) => (height != null ? `${height}mm` : 'unset')};
`;

const TemplateParamsWrapper = styled.div`
  margin-bottom: 2mm;
`;

const PageMargin = styled.div`
  padding: 20mm;
`;

const Table = styled.table`
  table-layout: fixed;
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  :nth-child(2n + 1) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    -webkit-print-color-adjust: exact;
    background-color: #eee;
  }
`;

const TableHead = styled.th`
  background-color: #ddd;
`;

const TableData = styled.td`
  text-align: center;
`;

const selector = ({ page, printOptions, editor }: RootState) => ({
  page: getPages(page),
  templateIDs: editor.templateIDs,
  templates: editor.templates,
  threads: editor.threads,
  printOptions,
});

const Preview = () => {
  const { page, printOptions, templateIDs, templates, threads } = useSelector(
    selector
  );
  const { withPinNumber, withProcedure, withParams, pinSize } = printOptions;
  const { width, height, zoomFactor } = page;
  const drawOptions = useMemo(() => ({ withPinNumber, pinSize }), [
    withPinNumber,
    pinSize,
  ]);
  const chunkSize = 20;
  const headers = [<th key={0}></th>];
  for (let i = 1; i <= chunkSize; i++) {
    headers[i] = <TableHead key={i}>{i}</TableHead>;
  }

  useEffect(() => {
    let style = document.getElementById(PrintStyleId);
    if (!style) {
      style = document.createElement('style');
      style.id = PrintStyleId;
      document.head.appendChild(style);
    }
    style.innerHTML = `@media print{@page{size: ${page.css};}}`;
  }, [page.css]);
  return (
    <Wapper>
      <Zoomer zoomFactor={zoomFactor}>
        <Page width={width} height={height} color="red">
          <Canvas width={width} height={height}>
            {templateIDs.map((id) => {
              const template = templates[id];
              if (template.type === 'none' || !template.visible) return null;
              return (
                <Selector
                  key={id}
                  templateProps={template}
                  drawOptions={drawOptions}
                  threadsDict={threads}
                />
              );
            })}
          </Canvas>
          {withParams && (
            <Position top={10} left={10} width={50}>
              {templateIDs.map((id) => {
                const template = templates[id];
                return (
                  <TemplateParamsWrapper key={id}>
                    <TemplateParams template={template} threads={threads} />
                  </TemplateParamsWrapper>
                );
              })}
            </Position>
          )}
        </Page>
        {withProcedure &&
          templateIDs.map((id) => {
            const template = templates[id];
            if (!('threads' in template)) return;
            return template.threads.map((id, k) => {
              const thread = threads[id];
              return (
                <Page
                  key={`${template.id}-${thread.id}`}
                  width={width}
                  height={height}
                >
                  <PageMargin>
                    <Procedure
                      template={template}
                      thread={thread}
                      chunkSize={chunkSize}
                      headers={headers}
                    />
                  </PageMargin>
                </Page>
              );
            });
          })}
      </Zoomer>
    </Wapper>
  );
};

export default Preview;
