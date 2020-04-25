import styled from '@emotion/styled';

const ThreadColor = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  -webkit-print-color-adjust: exact;
  display: inline-block;
  width: 0.7em;
  height: 0.7em;
  border: 1px solid black;
  margin: 0 0.1em;
`;

export default ThreadColor;
