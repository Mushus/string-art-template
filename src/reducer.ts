import presetDialogModule, {
  State as PresetDialogState,
} from '~/modules/presetDialog';
import pageModule, { State as PageState } from '~/modules/page';
import printOptionsModule, {
  State as PrintOptionsState,
} from '~/modules/printOptions';
import editorModule, { State as EditorState } from '~/modules/editor';
import threadDialogModule, {
  State as ThreadDialogState,
} from '~/modules/threadDialog';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  page: PageState;
  editor: EditorState;
  presetDialog: PresetDialogState;
  printOptions: PrintOptionsState;
  threadDialog: ThreadDialogState;
}

const rootReducer = combineReducers<RootState>({
  page: pageModule.reducer,
  editor: editorModule.reducer,
  presetDialog: presetDialogModule.reducer,
  printOptions: printOptionsModule.reducer,
  threadDialog: threadDialogModule.reducer,
});

export default rootReducer;
