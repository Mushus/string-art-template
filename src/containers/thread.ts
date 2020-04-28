import { useCallback } from 'react';
import { actions } from '~/modules/editor';
import { Thread } from '~/modules/data/current';
import { RootState } from '~/reducer';
import { useSelector, useDispatch } from 'react-redux';

const selector = (state: RootState) => state.editor.threads;

export const useThreadUpdator = (id: string) => {
  const threads = useSelector(selector);
  const thread = threads[id];
  const dispatch = useDispatch();
  const onUpdate = useCallback(
    <T extends keyof Thread>(key: T, value: Thread[T]) => {
      if (!thread) return;
      dispatch(
        actions.updateThread({
          ...thread,
          [key]: value,
        })
      );
    },
    [thread, dispatch]
  );
  return onUpdate;
};
