import React, { useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/editor';
import { actions as presetDialogActions } from '~/modules/presetDialog';
import { actions as threadActions } from '~/modules/threadDialog';
import {
  TemplateProps,
  PropsCircle,
  PropsNone,
  PropsPolygon,
  PropsStar,
  ThreadProps,
} from '~/modules/data/internal';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Selector from '~/components/threadTemplateEditors/Selector';
import TemplateEditor from '~/components/TemplateEditor';

const defaultPropsNone: Omit<PropsNone, 'id'> = {
  type: 'none',
  name: '',
};

const defaultPropsCircle: Omit<PropsCircle, 'id'> = {
  type: 'circle',
  name: '',
  radius: 75,
  pinNum: 24,
  intervalRatio: 1,
  threads: [],
};

const defaultPropsPolygon: Omit<PropsPolygon, 'id'> = {
  type: 'polygon',
  name: '',
  radius: 75,
  vertexNum: 5,
  pinNum: 5,
  threads: [],
};

const defaultPropsStar: Omit<PropsStar, 'id'> = {
  type: 'star',
  name: '',
  outerRadius: 75,
  innerRadius: 50,
  vertexNum: 5,
  pinNum: 5,
  threads: [],
};

interface TemplateEditorContainerProps {
  props: TemplateProps;
  threads: { [k: string]: ThreadProps };
  children?: React.ReactNode;
}

const TemplateEditorContainer = ({
  props,
  threads,
  children,
}: TemplateEditorContainerProps) => {
  const dispatch = useDispatch();
  const { id, type } = props;

  const onChangeShape = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      const { value } = e.target;
      if (value === type) return;
      switch (value) {
        case 'circle':
          return dispatch(actions.updateShape({ id, ...defaultPropsCircle }));
        case 'polygon':
          return dispatch(actions.updateShape({ id, ...defaultPropsPolygon }));
        case 'star':
          return dispatch(actions.updateShape({ id, ...defaultPropsStar }));
        default:
          return dispatch(actions.updateShape({ id, ...defaultPropsNone }));
      }
    },
    [id, type, dispatch]
  );

  const onChangeName = useCallback(
    (e: ChangeEvent<{ value: string }>) => {
      const name = e.target.value;
      dispatch(actions.updateShape({ ...props, name }));
    },
    [props]
  );

  const onDelete = useCallback(() => {
    dispatch(actions.removeShape(id));
  }, [id, dispatch]);

  const onAddThreads = useCallback(() => {
    dispatch(actions.addThread({ templateID: id }));
  }, [id, dispatch]);

  const onDeleteThreads = useCallback(
    (threadID: string) => {
      dispatch(
        actions.removeThread({
          templateID: id,
          threadID,
        })
      );
    },
    [id, dispatch]
  );

  const onUpdateThreads = useCallback(
    (props: ThreadProps) => {
      dispatch(actions.updateThread(props));
    },
    [dispatch]
  );

  const onOpenThreadDialog = useCallback(
    (id: string) => {
      dispatch(threadActions.open(id));
    },
    [dispatch]
  );

  return (
    <TemplateEditor
      props={props}
      threads={threads}
      onChangeName={onChangeName}
      onChangeShape={onChangeShape}
      onDelete={onDelete}
      onAddThreads={onAddThreads}
      onDeleteThreads={onDeleteThreads}
      onUpdateThreads={onUpdateThreads}
      onOpenThreadDialog={onOpenThreadDialog}
    >
      {children}
    </TemplateEditor>
  );
};

const Wrapper = styled.div`
  margin: 10px;
`;
const Controller = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const ButtonWrapper = styled.div`
  margin-right: 10px;
`;

const Editor = styled.div``;

const selector = ({
  editor: { templates, templateIDs, threads },
}: RootState) => ({
  templates,
  threads,
  templateIDs,
});

const EditorContainer = () => {
  const { templateIDs, templates, threads } = useSelector(selector);
  const dispatch = useDispatch();

  const handleClickAdd = useCallback(() => dispatch(actions.addShape()), [
    dispatch,
  ]);

  const handleClickOpenPresetDialog = useCallback(
    () => dispatch(presetDialogActions.open()),
    [dispatch]
  );

  return (
    <Wrapper>
      <Controller>
        <ButtonWrapper>
          <Tooltip title="テンプレートを追加する">
            <Button
              className="button-icon"
              variant="contained"
              color="primary"
              onClick={handleClickAdd}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </ButtonWrapper>
        <ButtonWrapper>
          <Tooltip title="プリセットから追加する">
            <Button
              className="button-icon"
              variant="contained"
              color="secondary"
              onClick={handleClickOpenPresetDialog}
            >
              <FavoriteIcon />
            </Button>
          </Tooltip>
        </ButtonWrapper>
      </Controller>
      <Editor>
        {templateIDs.map((id) => {
          const props = templates[id];
          return (
            <TemplateEditorContainer key={id} props={props} threads={threads}>
              <Selector props={props} />
            </TemplateEditorContainer>
          );
        })}
      </Editor>
    </Wrapper>
  );
};

export default EditorContainer;
