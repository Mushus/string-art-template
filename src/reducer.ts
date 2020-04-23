import canvasModule from '~/modules/canvas';
import { State as CanvasState } from '~/modules/canvas/types';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  canvas: CanvasState;
}

const rootReducer = combineReducers<RootState>({
  canvas: canvasModule.reducer,
});

export default rootReducer;
