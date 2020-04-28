import React, { useCallback, ChangeEvent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/threadDialog';
import { Thread } from '~/modules/data/current';
import EasyInput from '~/components/EasyInput';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  isUnsignedInt,
  isUnsigindIntWithoutZero,
} from '~/components/threadTemplateEditors/utils';
import { useThreadUpdator } from './thread';

const InputWrapper = styled.div<{ fillWidth?: boolean }>`
  margin-bottom: 10px;
  ${({ fillWidth }) =>
    fillWidth
      ? css`
          flex: 1 1 auto;
        `
      : ''};
`;

const selector = ({ editor: { threads }, threadDialog }: RootState) => ({
  threads,
  threadDialog,
});

const AuxiliaryLineDialog = () => {
  const { threads, threadDialog } = useSelector(selector);

  const { isOpen, id } = threadDialog;
  const thread = threads[id];

  const dispatch = useDispatch();

  const onClose = useCallback(() => dispatch(actions.close()), [dispatch]);

  const onUpdate = useThreadUpdator(id);

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
      <DialogTitle>糸シミュレーション</DialogTitle>
      {thread && (
        <DialogContent>
          <InputWrapper fillWidth={true}>
            <EasyInput
              label="開始位置"
              type="number"
              variant="outlined"
              size="small"
              value={thread.start}
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
              value={thread.loopCount}
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
