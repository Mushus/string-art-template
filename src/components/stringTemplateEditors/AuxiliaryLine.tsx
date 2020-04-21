import React, { useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EasyInput from '../EasyInput';
import { AuxiliaryLine as AuxiliaryLineProps } from '~/modules/canvas';
import ColorSelector from '../colorSelector';
import { isNumberArray, isUnsignedInt } from './utils';

type Props = AuxiliaryLineProps & {
  onDelete: () => void;
  onUpdate: (props: AuxiliaryLineProps) => void;
};

const Wrapper = styled.div`
  display: flex;
`;

const InputWrapper = styled.div<{ fillWidth?: boolean }>`
  :not(:last-child) {
    margin-right: 5px;
  }
  ${({ fillWidth }) =>
    fillWidth
      ? css`
          flex: 1 1 auto;
        `
      : ''};
`;

const AuxiliaryLine = ({
  color,
  patterns,
  start,
  onDelete,
  onUpdate,
}: Props) => {
  const patternsValue = patterns.join(', ');
  const onUpdateColor = useCallback(
    (color: string) => onUpdate({ color, patterns, start }),
    [start, patterns, onUpdate]
  );
  const onUpdateStart = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onUpdate({ color, patterns, start: Number(value) });
    },
    [color, patterns, onUpdate]
  );
  const onUpdatePatterns = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const patterns = value.split(',').map((v) => Number(v.trim()));
      onUpdate({ color, patterns, start });
    },
    [color, start, onUpdate]
  );
  return (
    <Wrapper>
      <InputWrapper>
        <ColorSelector value={color} onUpdate={onUpdateColor} />
      </InputWrapper>
      <InputWrapper>
        <EasyInput
          label="開始位置"
          type="text"
          variant="outlined"
          size="small"
          value={start}
          placeholder="数値"
          onChange={onUpdateStart}
          validator={isUnsignedInt}
        />
      </InputWrapper>
      <InputWrapper fillWidth={true}>
        <EasyInput
          label="パターン"
          type="text"
          variant="outlined"
          size="small"
          value={patternsValue}
          placeholder="「,」区切りの整数"
          onChange={onUpdatePatterns}
          validator={isNumberArray}
          fullWidth
        />
      </InputWrapper>
      <InputWrapper>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </InputWrapper>
    </Wrapper>
  );
};

export default AuxiliaryLine;
