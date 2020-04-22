import React, { useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import EasyInput from '../EasyInput';
import { AuxiliaryLine as AuxiliaryLineProps } from '~/modules/canvas';
import ColorSelector from '~/components/colorSelector';
import { isCalcuratableArray } from './utils';
import { splitCalcuratableArray } from '~/logic';

type Props = {
  color: AuxiliaryLineProps['color'];
  patterns: AuxiliaryLineProps['patterns'];
  onDelete: () => void;
  onUpdate: <T extends keyof AuxiliaryLineProps>(
    key: T,
    value: AuxiliaryLineProps[T]
  ) => void;
  onOpenDialog: () => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  onDelete,
  onUpdate,
  onOpenDialog,
}: Props) => {
  const patternsValue = patterns.join(', ');
  const onUpdateColor = useCallback(
    (color: string) => onUpdate('color', color),
    [onUpdate]
  );

  const onUpdatePatterns = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const patterns = splitCalcuratableArray(value)?.map((v) => v.trim());
      if (!patterns) return;
      onUpdate('patterns', patterns);
    },
    [onUpdate]
  );
  return (
    <>
      <Wrapper>
        <InputWrapper>
          <ColorSelector value={color} onUpdate={onUpdateColor} />
        </InputWrapper>
        <InputWrapper fillWidth={true}>
          <Tooltip title="糸を掛けるピンの手順を指定する">
            <EasyInput
              label="パターン"
              type="text"
              variant="outlined"
              size="small"
              value={patternsValue}
              placeholder="「,」区切りの整数"
              onChange={onUpdatePatterns}
              validator={isCalcuratableArray}
              fullWidth
            />
          </Tooltip>
        </InputWrapper>
        <InputWrapper>
          <Tooltip title="その他の設定を開く">
            <Button
              className="button-icon"
              variant="contained"
              color="primary"
              onClick={onOpenDialog}
            >
              <SettingsIcon />
            </Button>
          </Tooltip>
        </InputWrapper>
        <InputWrapper>
          <Tooltip title="この糸を削除する">
            <Button
              className="button-icon"
              variant="contained"
              color="secondary"
              onClick={onDelete}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </InputWrapper>
      </Wrapper>
    </>
  );
};

export default AuxiliaryLine;
