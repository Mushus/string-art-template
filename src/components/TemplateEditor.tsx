import React, { ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ShapeTemplates from '~/constants/shapeTemplates';
import styled from '@emotion/styled';
import {
  TemplateProps,
  AuxiliaryLine as AuxiliaryLineProps,
} from '~/modules/canvas';
import AuxiliaryLine from '~/components/stringTemplateEditors/AuxiliaryLine';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const HeaderControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0;
  padding: 0 10px;
`;

const BasicControl = styled.div`
  margin: 20px 0 10px;
  padding: 0 10px;
`;

const FooterControl = styled.div`
  background-color: #eee;
  padding: 0 10px;
`;
const FooterController = styled.div`
  margin: 10px 0;
`;

const FooterTitle = styled.span`
  margin-left: 10px;
`;

const AuxiliaryLinesWrapper = styled.div`
  margin: 20px 0 10px;
`;

interface Props {
  props: TemplateProps;
  onChangeShape: (event: ChangeEvent<{ value: unknown }>) => void;
  onDelete: () => void;
  onAddAuxiliaryLines: () => void;
  onDeleteAuxiliaryLines: (index: number) => void;
  onUpdateAuxiliaryLines: (index: number, props: AuxiliaryLineProps) => void;
  onOpenAuxiliaryLineDialog: (auxiliaryLineIndex: number) => void;
  children?: React.ReactNode;
}

const shapeLabel = '形状';
const TemplateEditor = ({
  props,
  onChangeShape,
  onDelete,
  onAddAuxiliaryLines,
  onDeleteAuxiliaryLines,
  onUpdateAuxiliaryLines,
  onOpenAuxiliaryLineDialog,
  children,
}: Props) => {
  return (
    <Wrapper>
      <HeaderControl>
        <FormControl variant="outlined" size="small">
          <InputLabel>{shapeLabel}</InputLabel>
          <Select
            native
            value={props.type}
            onChange={onChangeShape}
            label={shapeLabel}
          >
            {ShapeTemplates.map(({ name, key }, i) => (
              <option key={i} value={key}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </HeaderControl>
      <BasicControl>{children}</BasicControl>
      {'auxiliaryLines' in props && (
        <FooterControl>
          <FooterController>
            <Button
              variant="contained"
              color="primary"
              onClick={onAddAuxiliaryLines}
            >
              <AddIcon />
            </Button>
            <FooterTitle>糸シミュレーション</FooterTitle>
          </FooterController>
          {props.auxiliaryLines.map((lines, index) => {
            const onDelete = () => onDeleteAuxiliaryLines(index);
            const onUpdate = <T extends keyof AuxiliaryLineProps>(
              key: T,
              value: AuxiliaryLineProps[T]
            ) => {
              onUpdateAuxiliaryLines(index, { ...lines, [key]: value });
            };
            const onOpenDialog = () => {
              onOpenAuxiliaryLineDialog(index);
            };
            return (
              <AuxiliaryLinesWrapper key={index}>
                <AuxiliaryLine
                  color={lines.color}
                  patterns={lines.patterns}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  onOpenDialog={onOpenDialog}
                />
              </AuxiliaryLinesWrapper>
            );
          })}
        </FooterControl>
      )}
    </Wrapper>
  );
};

export default TemplateEditor;
