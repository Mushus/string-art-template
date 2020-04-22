import React, { useCallback, ChangeEvent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions, AuxiliaryLine } from '~/modules/canvas';
import EasyInput from '~/components/EasyInput';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  isUnsignedInt,
  isUnsigindIntWithoutZero,
} from '~/components/stringTemplateEditors/utils';
import { useAuxiliaryLineUpdator } from './auxiliaryLine';

const InputWrapper = styled.div<{ fillWidth?: boolean }>`
  margin-bottom: 10px;
  ${({ fillWidth }) =>
    fillWidth
      ? css`
          flex: 1 1 auto;
        `
      : ''};
`;

const selector = (state: RootState) => state.canvas;

const AuxiliaryLineDialog = () => {
  const { templates, auxiliaryLineDialog } = useSelector(selector);

  const { isOpen, templateIndex, auxiliaryLineIndex } = auxiliaryLineDialog;
  const template = templates[templateIndex];
  let auxiliaryLine: AuxiliaryLine | null = null;
  if (template && 'auxiliaryLines' in template) {
    auxiliaryLine = template.auxiliaryLines[auxiliaryLineIndex];
  }

  const dispatch = useDispatch();

  const onClose = useCallback(
    () => dispatch(actions.closeAuxiliaryLineDialog()),
    [dispatch]
  );

  const onUpdate = useAuxiliaryLineUpdator(templateIndex, auxiliaryLineIndex);

  const onUpdateStart = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onUpdate('start', Number(value));
    },
    [onUpdate]
  );

  const onUpdateLoopCount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onUpdate('loopCount', Number(value));
    },
    [onUpdate]
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>糸掛けシミュレーション</DialogTitle>
      {auxiliaryLine && (
        <DialogContent>
          <InputWrapper fillWidth={true}>
            <EasyInput
              label="開始位置"
              type="number"
              variant="outlined"
              size="small"
              value={auxiliaryLine.start}
              placeholder="数値"
              onChange={onUpdateStart}
              validator={isUnsignedInt}
              fullWidth
            />
          </InputWrapper>
          <InputWrapper fillWidth={true}>
            <EasyInput
              label="繰り返す回数"
              type="number"
              variant="outlined"
              size="small"
              value={auxiliaryLine.loopCount}
              placeholder="数値"
              onChange={onUpdateLoopCount}
              validator={isUnsigindIntWithoutZero}
              fullWidth
            />
          </InputWrapper>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AuxiliaryLineDialog;
