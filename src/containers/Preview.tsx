import React, { useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import Canvas from '~/components/Canvas';
import Selector from '~/components/stringTemplates/Selector';
import styled from '@emotion/styled';
import { getZooms } from '~/modules/page';
import { getTemplates } from '~/modules/editor';

export const chunked = <T extends any>(ary: Array<T>, size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < ary.length; i += size) {
    result.push(ary.slice(i, i + size));
  }
  return result;
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

const PageMargin = styled.div`
  margin: 20mm;
`;

const ThreadColor = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  border: 1px solid black;
  margin: 0 10px;
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
  zooms: getZooms(page),
  templates: getTemplates(editor),
  printOptions,
});

const Preview = () => {
  const { zooms, printOptions, templates } = useSelector(selector);
  const { withPinNumber, withProcedure, pinSize } = printOptions;
  const { width, height, zoomFactor } = zooms;
  const drawOptions = useMemo(() => ({ withPinNumber, pinSize }), [
    withPinNumber,
    pinSize,
  ]);
  const chunkSize = 20;
  const headers = [<th key={0}></th>];
  for (let i = 1; i <= chunkSize; i++) {
    headers[i] = <TableHead key={i}>{i}</TableHead>;
  }
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
        {withProcedure &&
          templates.map((props, i) => {
            if (!('threads' in props)) return;
            return props.threads.map((pinNumbers, k) => (
              <Page key={k} width={width} height={height}>
                <PageMargin>
                  <h1>手順</h1>
                  <h2>
                    {props.name}
                    {i} 糸{k}
                    <ThreadColor color={pinNumbers.color} />
                  </h2>
                  <p>表は左上から横に読みます。</p>
                  <p>テンプレートの対応する数字のピンに紐を掛けます。</p>
                  <Table>
                    <thead>
                      <TableRow>{headers}</TableRow>
                    </thead>
                    <tbody>
                      {chunked(pinNumbers.pinIndexes, chunkSize).map(
                        (row, i) => (
                          <TableRow key={i}>
                            <TableHead>{i * chunkSize}</TableHead>
                            {row.map((data, i) => (
                              <TableData key={i}>{data}</TableData>
                            ))}
                          </TableRow>
                        )
                      )}
                    </tbody>
                  </Table>
                  {/*
                  <p>スタート位置: {pinNumbers.start}</p>
                  <Table>
                    <thead>
                      <TableRow>{headers}</TableRow>
                    </thead>
                    <tbody>
                      {chunked(pinNumbers.pinShifts, chunkSize).map((row, i) => (
                        <TableRow key={i}>
                          <TableHead>{i * chunkSize}</TableHead>
                          {row.map((data, i) => (
                            <TableData key={i}>{data}</TableData>
                          ))}
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                  */}
                </PageMargin>
              </Page>
            ));
          })}
      </Zoomer>
    </Wapper>
  );
};

export default Preview;
