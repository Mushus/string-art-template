import canvasModule from '~/modules/canvas';
import presetDialogModule, {
  State as PresetDialogState,
} from '~/modules/presetDialog';
import { State as CanvasState } from '~/modules/canvas/types';
import printOptionsModule, {
  State as PrintOptionsState,
} from '~/modules/printOptions';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  canvas: CanvasState;
  presetDialog: PresetDialogState;
  printOptions: PrintOptionsState;
}

const rootReducer = combineReducers<RootState>({
  canvas: canvasModule.reducer,
  presetDialog: presetDialogModule.reducer,
  printOptions: printOptionsModule.reducer,
});

export default rootReducer;
