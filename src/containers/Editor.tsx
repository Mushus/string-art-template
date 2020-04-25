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
  Thread,
  PropsNone,
  PropsPolygon,
  PropsStar,
} from '~/modules/data/current';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Selector from '~/components/stringTemplateEditors/Selector';
import TemplateEditor from '~/components/TemplateEditor';

const defaultPropsNone: PropsNone = {
  type: 'none',
};

const defaultPropsCircle: PropsCircle = {
  type: 'circle',
  radius: 75,
  pinNum: 24,
  intervalRatio: 1,
  threads: [],
};

const defaultPropsPolygon: PropsPolygon = {
  type: 'polygon',
  radius: 75,
  vertexNum: 5,
  pinNum: 5,
  threads: [],
};

const defaultPropsStar: PropsStar = {
  type: 'star',
  outerRadius: 75,
  innerRadius: 50,
  vertexNum: 5,
  pinNum: 5,
  threads: [],
};

interface TemplateEditorContainerProps {
  index: number;
  props: TemplateProps;
  children?: React.ReactNode;
}

const TemplateEditorContainer = ({
  index,
  props,
  children,
}: TemplateEditorContainerProps) => {
  const dispatch = useDispatch();
  const { type } = props;

  const onChangeShape = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      const { value } = e.target;
      if (value === type) return;
      switch (value) {
        case 'circle':
          return dispatch(
            actions.updateShape({
              index,
              props: { ...defaultPropsCircle },
            })
          );
        case 'polygon':
          return dispatch(
            actions.updateShape({
              index,
              props: { ...defaultPropsPolygon },
            })
          );
        case 'star':
          return dispatch(
            actions.updateShape({
              index,
              props: { ...defaultPropsStar },
            })
          );
        default:
          return dispatch(
            actions.updateShape({
              index,
              props: defaultPropsNone,
            })
          );
      }
    },
    [index, type, dispatch]
  );

  const onDelete = useCallback(() => {
    dispatch(actions.removeShape({ index }));
  }, [index, dispatch]);

  const onAddThreads = useCallback(() => {
    dispatch(actions.addThread({ templateIndex: index }));
  }, [index, dispatch]);

  const onDeleteThreads = useCallback(
    (threadIndex: number) => {
      dispatch(
        actions.removeThread({
          templateIndex: index,
          threadIndex,
        })
      );
    },
    [index, dispatch]
  );

  const onUpdateThreads = useCallback(
    (threadIndex: number, props: Thread) => {
      dispatch(
        actions.updateThread({
          templateIndex: index,
          threadIndex,
          props,
        })
      );
    },
    [index, dispatch]
  );

  const onOpenThreadDialog = useCallback(
    (threadIndex: number) => {
      dispatch(
        threadActions.open({
          templateIndex: index,
          threadIndex,
        })
      );
    },
    [index, dispatch]
  );

  return (
    <TemplateEditor
      props={props}
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

const selector = ({ editor }: RootState) => editor.data;

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

const EditorContainer = () => {
  const { templates } = useSelector(selector);
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
        {templates.map((props, index) => (
          <TemplateEditorContainer key={index} index={index} props={props}>
            <Selector index={index} props={props} />
          </TemplateEditorContainer>
        ))}
      </Editor>
    </Wrapper>
  );
};

export default EditorContainer;
