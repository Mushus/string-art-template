import canvasModule from '~/modules/canvas';
import presetDialogModule, {
  State as PresetDialogState,
} from '~/modules/presetDialog';
import { State as CanvasState } from '~/modules/canvas/types';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  canvas: CanvasState;
  presetDialog: PresetDialogState;
}

const rootReducer = combineReducers<RootState>({
  canvas: canvasModule.reducer,
  presetDialog: presetDialogModule.reducer,
});

export default rootReducer;
