import canvasModule, { State as CanvasState } from '~/modules/canvas';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  canvas: CanvasState;
}

const rootReducer = combineReducers<RootState>({
  canvas: canvasModule.reducer,
});

export default rootReducer;
