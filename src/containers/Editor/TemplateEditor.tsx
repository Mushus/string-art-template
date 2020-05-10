import React, { useCallback, ChangeEvent, MouseEvent, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShapeTemplates from '~/constants/shapeTemplates';
import { actions, TemplateUI } from '~/modules/editor';
import { actions as threadActions } from '~/modules/threadDialog';
import { TemplateProps, ThreadProps } from '~/modules/data/internal';
import Thread from '~/components/threadTemplateEditors/Thread';
import ControlWrapper from '~/components/threadTemplateEditors/ControlWrapper';
import EasyInput from '~/components/EasyInput';
import Collapse from '~/components/Collapse';

interface Props {
  props: TemplateProps;
  ui: TemplateUI;
  threads: { [k: string]: ThreadProps };
  isCollapse: boolean;
  children?: React.ReactNode;
}

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

const TemplateEditorContainer = forwardRef<HTMLDivElement, Props>(
  ({ props, threads, isCollapse, children }, ref) => {
    const dispatch = useDispatch();
    const { id, type } = props;

    const onClickCollapse = useCallback(
      () => dispatch(actions.toggleCollapse(id)),
      [id, dispatch]
    );

    const onClickVisible = useCallback(
      () =>
        dispatch(actions.updateShape({ ...props, visible: !props.visible })),
      [props, dispatch]
    );

    const onChangeName = useCallback(
      (e: ChangeEvent<{ value: string }>) => {
        const name = e.target.value;
        dispatch(actions.updateShape({ ...props, name }));
      },
      [props]
    );

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

    const onOpenMenu = useCallback(
      (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
        dispatch(
          actions.openMenu({ elem: event.currentTarget, templateID: id })
        ),
      [id, dispatch]
    );

    return (
      <Wrapper ref={ref}>
        <HeaderControl>
          <HeaderItemWrapper>
            <IconButton size="small" onClick={onClickCollapse}>
              {isCollapse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
          </HeaderItemWrapper>
          <HeaderItemWrapper>
            <EasyInput
              label={
                ShapeTemplates.find((shape) => shape.key === type)?.name ||
                '名称'
              }
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
            <IconButton size="small" onClick={onOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </HeaderItemWrapper>
        </HeaderControl>
        <Collapse isShow={!isCollapse}>
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
  }
);

export default TemplateEditorContainer;
