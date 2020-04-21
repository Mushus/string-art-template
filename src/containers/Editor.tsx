import React, { useCallback, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/reducer';
import {
  actions,
  TemplateProps,
  PropsCircle,
  AuxiliaryLine,
  PropsNone,
  PropsPolygon,
  PropsStar,
} from '~/modules/canvas';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Selector from '~/components/stringTemplateEditors/Selector';
import TemplateEditor from '~/components/TemplateEditor';

const defaultPropsNone: PropsNone = {
  type: 'none',
};

const defaultPropsCircle: PropsCircle = {
  type: 'circle',
  radius: 50,
  pinNum: 24,
  intervalRatio: 1,
  auxiliaryLines: [],
};

const defaultPropsPolygon: PropsPolygon = {
  type: 'polygon',
  radius: 50,
  vertexNum: 5,
  pinNum: 5,
  auxiliaryLines: [],
};

const defaultPropsStar: PropsStar = {
  type: 'star',
  outerRadius: 50,
  innerRadius: 25,
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
    dispatch(actions.addAuxiliaryLine({ shapeIndex: index }));
  }, [index, dispatch]);

  const onDeleteAuxiliaryLines = useCallback(
    (auxiliaryLineIndex: number) => {
      dispatch(
        actions.removeAuxiliaryLine({ shapeIndex: index, auxiliaryLineIndex })
      );
    },
    [index, dispatch]
  );

  const onUpdateAuxiliaryLines = useCallback(
    (auxiliaryLineIndex: number, props: AuxiliaryLine) => {
      dispatch(
        actions.updateAuxiliaryLine({
          shapeIndex: index,
          auxiliaryLineIndex,
          props,
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
        <Button variant="contained" color="primary" onClick={handleClickAdd}>
          <AddIcon />
        </Button>
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
