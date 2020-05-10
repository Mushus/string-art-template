import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import FlipMove from 'react-flip-move';
import { RootState } from '~/reducer';
import { actions } from '~/modules/editor';
import { actions as presetDialogActions } from '~/modules/presetDialog';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Selector from '~/components/threadTemplateEditors/Selector';
import TemplateEditorContainer from '~/containers/Editor/TemplateEditor';
import TemplateOptionMenu from '~/containers/Editor/TemplateOptionMenu';
import AddTemplateButton from '~/containers/Editor/AddTemplateButton';

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
  editor: { templates, templateIDs, threads, templateUIs, collapsed },
}: RootState) => ({
  templates,
  threads,
  templateIDs,
  templateUIs,
  collapsed,
});

const EditorContainer = () => {
  const {
    templateIDs,
    templates,
    threads,
    templateUIs,
    collapsed,
  } = useSelector(selector);
  const dispatch = useDispatch();

  const handleClickOpenPresetDialog = useCallback(
    () => dispatch(presetDialogActions.open()),
    [dispatch]
  );

  return (
    <Wrapper>
      <TemplateOptionMenu />
      <Controller>
        <ButtonWrapper>
          <AddTemplateButton />
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
        <FlipMove>
          {templateIDs.map((id) => {
            const props = templates[id];
            const ui = templateUIs[id];
            return (
              <TemplateEditorContainer
                isCollapse={collapsed !== id}
                key={id}
                props={props}
                ui={ui}
                threads={threads}
              >
                <Selector props={props} />
              </TemplateEditorContainer>
            );
          })}
        </FlipMove>
      </Editor>
    </Wrapper>
  );
};

export default EditorContainer;
