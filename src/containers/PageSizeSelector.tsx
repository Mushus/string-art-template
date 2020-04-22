import React, { useCallback, ChangeEvent } from 'react';
import PageSizeSelector from '~/components/PageSizeSelector';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/canvas';

const selector = (state: RootState) => state.canvas;

const PageSizeSelectorContainer = () => {
  const {
    page: { key, zoomFactor },
  } = useSelector(selector);

  const dispatch = useDispatch();

  const onChangeSize = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      const key = String(e.target.value);
      dispatch(actions.setPage({ key }));
    },
    [dispatch]
  );

  const onClickZoomIn = useCallback(() => dispatch(actions.zoomIn()), [
    dispatch,
  ]);

  const onClickZoomOut = useCallback(() => dispatch(actions.zoomOut()), [
    dispatch,
  ]);
  const onClickPrint = useCallback(() => window.print(), []);

  return (
    <PageSizeSelector
      zoomFactor={zoomFactor}
      currentSize={key}
      onChangeSize={onChangeSize}
      onClickZoomIn={onClickZoomIn}
      onClickZoomOut={onClickZoomOut}
      onClickPrint={onClickPrint}
    />
  );
};

export default PageSizeSelectorContainer;
