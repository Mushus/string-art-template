import { useCallback } from 'react';
import { AuxiliaryLine, actions } from '~/modules/canvas';
import { RootState } from '~/reducer';
import { useSelector, useDispatch } from 'react-redux';

const selector = (state: RootState) => state.canvas;

export const useAuxiliaryLineUpdator = (
  templateIndex: number,
  auxiliaryLineIndex: number
) => {
  const { templates } = useSelector(selector);

  const template = templates[templateIndex];
  let auxiliaryLine: AuxiliaryLine | null = null;
  if ('auxiliaryLines' in template) {
    auxiliaryLine = template.auxiliaryLines[auxiliaryLineIndex];
  }

  const dispatch = useDispatch();
  const onUpdate = useCallback(
    <T extends keyof AuxiliaryLine>(key: T, value: AuxiliaryLine[T]) => {
      if (!auxiliaryLine) return;
      dispatch(
        actions.updateAuxiliaryLine({
          templateIndex,
          auxiliaryLineIndex,
          props: { ...auxiliaryLine, [key]: value },
        })
      );
    },
    [templateIndex, auxiliaryLineIndex, auxiliaryLine, dispatch]
  );
  return onUpdate;
};
