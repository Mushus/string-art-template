import React, { ChangeEvent, MouseEvent, memo } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ShapeTemplates from '~/constants/shapeTemplates';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from '@emotion/styled';
import { TemplateProps, ThreadProps } from '~/modules/data/internal';
import Thread from '~/components/threadTemplateEditors/Thread';
import ControlWrapper from '~/components/threadTemplateEditors/ControlWrapper';
import Collapse from '~/components/Collapse';
import EasyInput from './EasyInput';
import { TemplateUI } from '~/modules/editor';

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
  margin: 10px 0;
  padding: 0 10px;
`;
const HeaderItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :not(:last-child) {
    margin-left: 5px;
  }
`;

const BasicControl = styled.div`
  margin: 10px 0 10px;
  padding: 0 10px;
`;

const FooterControl = styled.div`
  overflow: hidden;
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
  ui: TemplateUI;
  threads: { [k: string]: ThreadProps };
  isCollapse: boolean;
  onClickMore: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  onClickCollapse: () => void;
  onClickVisible: () => void;
  onChangeName: (event: ChangeEvent<{ value: string }>) => void;
  onChangeShape: (event: ChangeEvent<{ value: unknown }>) => void;
  onAddThreads: () => void;
  onDeleteThreads: (id: string) => void;
  onUpdateThreads: (props: ThreadProps) => void;
  onOpenThreadDialog: (id: string) => void;
  children?: React.ReactNode;
}

const shapeLabel = '形状';
const TemplateEditor = ({
  props,
  ui,
  threads,
  isCollapse,
  onClickMore,
  onClickVisible,
  onClickCollapse,
  onChangeName,
  onChangeShape,
  onAddThreads,
  onDeleteThreads,
  onUpdateThreads,
  onOpenThreadDialog,
  children,
}: Props) => {
  return (
    <Wrapper>
      <HeaderControl>
        <HeaderItemWrapper>
          <IconButton size="small" onClick={onClickCollapse}>
            {isCollapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
        </HeaderItemWrapper>
        <HeaderItemWrapper>
          <EasyInput
            label="名称"
            type="text"
            variant="outlined"
            size="small"
            value={props.name}
            onChange={onChangeName}
          />
        </HeaderItemWrapper>
        <HeaderItemWrapper>
          <IconButton size="small" onClick={onClickVisible}>
            {props.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </HeaderItemWrapper>
        <HeaderItemWrapper>
          <IconButton size="small" onClick={onClickMore}>
            <MoreVertIcon />
          </IconButton>
        </HeaderItemWrapper>
      </HeaderControl>
      <Collapse isShow={!isCollapse}>
        <BasicControl>
          <ControlWrapper>
            <FormControl variant="outlined" size="small" fullWidth>
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
          </ControlWrapper>
          {children}
        </BasicControl>
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
            {props.threads.map((threadID) => {
              const thread = threads[threadID];
              const { color, patterns } = thread;
              const onDelete = () => onDeleteThreads(threadID);
              const onUpdate = <T extends keyof ThreadProps>(
                key: T,
                value: ThreadProps[T]
              ) => {
                onUpdateThreads({ ...thread, [key]: value });
              };
              const onOpenDialog = () => {
                onOpenThreadDialog(threadID);
              };
              return (
                <ThreadsWrapper key={threadID}>
                  <Thread
                    color={color}
                    patterns={patterns}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onOpenDialog={onOpenDialog}
                  />
                </ThreadsWrapper>
              );
            })}
          </FooterControl>
        )}
      </Collapse>
    </Wrapper>
  );
};

export default TemplateEditor;
