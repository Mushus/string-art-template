import React, { useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/canvas';
import {
  TemplateProps,
  PropsCircle,
  AuxiliaryLine,
  PropsNone,
  PropsPolygon,
  PropsStar,
} from '~/modules/canvas/types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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
  auxiliaryLines: [],
};

const defaultPropsPolygon: PropsPolygon = {
  type: 'polygon',
  radius: 75,
  vertexNum: 5,
  pinNum: 5,
  auxiliaryLines: [],
};

const defaultPropsStar: PropsStar = {
  type: 'star',
  outerRadius: 75,
  innerRadius: 50,
  vertexNum: 5,
  pinNum: 5,
  auxiliaryLines: [],
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

  const onAddAuxiliaryLines = useCallback(() => {
    dispatch(actions.addAuxiliaryLine({ templateIndex: index }));
  }, [index, dispatch]);

  const onDeleteAuxiliaryLines = useCallback(
    (auxiliaryLineIndex: number) => {
      dispatch(
        actions.removeAuxiliaryLine({
          templateIndex: index,
          auxiliaryLineIndex,
        })
      );
    },
    [index, dispatch]
  );

  const onUpdateAuxiliaryLines = useCallback(
    (auxiliaryLineIndex: number, props: AuxiliaryLine) => {
      dispatch(
        actions.updateAuxiliaryLine({
          templateIndex: index,
          auxiliaryLineIndex,
          props,
        })
      );
    },
    [index, dispatch]
  );

  const onOpenAuxiliaryLineDialog = useCallback(
    (auxiliaryLineIndex: number) => {
      dispatch(
        actions.openAuxiliaryLineDialog({
          templateIndex: index,
          auxiliaryLineIndex,
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
      onAddAuxiliaryLines={onAddAuxiliaryLines}
      onDeleteAuxiliaryLines={onDeleteAuxiliaryLines}
      onUpdateAuxiliaryLines={onUpdateAuxiliaryLines}
      onOpenAuxiliaryLineDialog={onOpenAuxiliaryLineDialog}
    >
      {children}
    </TemplateEditor>
  );
};

const selector = ({ canvas }: RootState) => canvas;

const Wrapper = styled.div`
  margin: 10px;
`;
const Controller = styled.div`
  margin-bottom: 20px;
`;

const Editor = styled.div``;

const EditorContainer = () => {
  const { templates } = useSelector(selector);
  const dispatch = useDispatch();

  const handleClickAdd = useCallback(() => dispatch(actions.addShape()), [
    dispatch,
  ]);

  return (
    <Wrapper>
      <Controller>
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
