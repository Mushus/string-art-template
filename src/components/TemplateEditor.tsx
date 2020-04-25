import React, { ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ShapeTemplates from '~/constants/shapeTemplates';
import styled from '@emotion/styled';
import { TemplateProps, Thread as ThreadProps } from '~/modules/data/current';
import Thread from '~/components/stringTemplateEditors/Thread';

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

const ThreadsWrapper = styled.div`
  margin: 20px 0 10px;
`;

interface Props {
  props: TemplateProps;
  onChangeShape: (event: ChangeEvent<{ value: unknown }>) => void;
  onDelete: () => void;
  onAddThreads: () => void;
  onDeleteThreads: (index: number) => void;
  onUpdateThreads: (index: number, props: ThreadProps) => void;
  onOpenThreadDialog: (auxiliaryLineIndex: number) => void;
  children?: React.ReactNode;
}

const shapeLabel = '形状';
const TemplateEditor = ({
  props,
  onChangeShape,
  onDelete,
  onAddThreads,
  onDeleteThreads,
  onUpdateThreads,
  onOpenThreadDialog,
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
        <div>
          {/* ボタンが縦長になる */}
          <Tooltip title="このテンプレートを削除">
            <Button
              className="button-icon"
              variant="contained"
              color="secondary"
              onClick={onDelete}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      </HeaderControl>
      <BasicControl>{children}</BasicControl>
      {'threads' in props && (
        <FooterControl>
          <FooterController>
            <Tooltip title="糸を追加する">
              <Button
                className="button-icon"
                variant="contained"
                color="primary"
                onClick={onAddThreads}
              >
                <AddIcon />
              </Button>
            </Tooltip>
            <FooterTitle>糸シミュレーション</FooterTitle>
          </FooterController>
          {props.threads.map((lines, index) => {
            const onDelete = () => onDeleteThreads(index);
            const onUpdate = <T extends keyof ThreadProps>(
              key: T,
              value: ThreadProps[T]
            ) => {
              onUpdateThreads(index, { ...lines, [key]: value });
            };
            const onOpenDialog = () => {
              onOpenThreadDialog(index);
            };
            return (
              <ThreadsWrapper key={index}>
                <Thread
                  color={lines.color}
                  patterns={lines.patterns}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  onOpenDialog={onOpenDialog}
                />
              </ThreadsWrapper>
            );
          })}
        </FooterControl>
      )}
    </Wrapper>
  );
};

export default TemplateEditor;
