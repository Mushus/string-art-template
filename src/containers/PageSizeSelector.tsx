import React, { useCallback, ChangeEvent } from 'react';
import PageSizeSelector from '~/components/PageSizeSelector';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions as editorActions } from '~/modules/editor';
import { actions as pageActions, getPages } from '~/modules/page';
import { loadFile, saveFile } from '~/modules/data/internal';

const selector = ({
  editor: { templates, templateIDs, threads },
  page,
}: RootState) => ({ templates, templateIDs, threads, page: getPages(page) });

const PageSizeSelectorContainer = () => {
  const { templates, templateIDs, threads, page } = useSelector(selector);
  const { key, zoomFactor } = page;

  const dispatch = useDispatch();

  const onChangeSize = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      const key = String(e.target.value);
      dispatch(pageActions.setPage({ key }));
    },
    [dispatch]
  );

  const onClickZoomIn = useCallback(() => dispatch(pageActions.zoomIn()), [
    dispatch,
  ]);

  const onClickZoomOut = useCallback(() => dispatch(pageActions.zoomOut()), [
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
          const data = loadFile(json);
          dispatch(editorActions.updateFromFile(data));
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
    const fileName = 'string-art-template.json';
    const json = JSON.stringify(
      saveFile(templateIDs, templates, threads),
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }, [templateIDs, templates, threads]);

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
