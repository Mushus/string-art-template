import { useCallback } from 'react';
import { actions } from '~/modules/editor';
import { Thread } from '~/modules/data/current';
import { RootState } from '~/reducer';
import { useSelector, useDispatch } from 'react-redux';

const selector = (state: RootState) => state.editor.data;

export const useThreadUpdator = (
  templateIndex: number,
  threadIndex: number
) => {
  const { templates } = useSelector(selector);

  const template = templates[templateIndex];
  let thread: Thread | null = null;
  if (template && 'threads' in template) {
    thread = template.threads[threadIndex];
  }

  const dispatch = useDispatch();
  const onUpdate = useCallback(
    <T extends keyof Thread>(key: T, value: Thread[T]) => {
      if (!thread) return;
      dispatch(
        actions.updateThread({
          templateIndex,
          threadIndex,
          props: { ...thread, [key]: value },
        })
      );
    },
    [templateIndex, threadIndex, thread, dispatch]
  );
  return onUpdate;
};
