import React, { useCallback, ChangeEvent } from 'react';
import PageSizeSelector from '~/components/PageSizeSelector';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/canvas';
import parse from '~/modules/canvas/parseTemplates';

const selector = (state: RootState) => state.canvas;

const PageSizeSelectorContainer = () => {
  const { templates, page } = useSelector(selector);
  const { key, zoomFactor } = page;

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

  const onClickLoad = useCallback(
    (
      elem: HTMLInputElement,
      event: ChangeEvent<{ files: FileList | null }>
    ) => {
      const target = event.target;
      if (!target) return;
      const files = target.files;
      if (!files) return;
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        try {
          const json = reader.result as string;
          const ary = parse(json);
          dispatch(actions.updateTemplates(ary));
        } catch (e) {
          console.log(e);
          alert('読み込みに失敗しました');
        } finally {
          elem.value = '';
        }
      };
    },
    [dispatch]
  );

  const onClickSave = useCallback(() => {
    const json = JSON.stringify(templates, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'string-art-template.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }, [templates]);

  return (
    <PageSizeSelector
      zoomFactor={zoomFactor}
      currentSize={key}
      onChangeSize={onChangeSize}
      onClickZoomIn={onClickZoomIn}
      onClickZoomOut={onClickZoomOut}
      onClickPrint={onClickPrint}
      onClickLoad={onClickLoad}
      onClickSave={onClickSave}
    />
  );
};

export default PageSizeSelectorContainer;
