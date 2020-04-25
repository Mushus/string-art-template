import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import PageSize from '~/constants/pageSize';
import ZoomFactors from '~/constants/zoomFactor';

export interface State {
  key: string;
  zoom: number;
}

const defaultPageKey = 'a4p';
const initialState: State = {
  key: defaultPageKey,
  zoom: 0,
};

const pageModules = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state: State, action: PayloadAction<{ key: string }>) {
      const { key } = action.payload;
      const pageSize = PageSize[key];
      if (!pageSize) return;
      state.key = key;
    },

    zoomIn(state: State) {
      const zoom = +state.zoom + 1;
      if (!ZoomFactors[zoom]) return;
      state.zoom = zoom;
    },
    zoomOut(state: State) {
      const zoom = +state.zoom - 1;
      if (!ZoomFactors[zoom]) return;
      state.zoom = zoom;
    },
  },
});

export default pageModules;

export const actions = pageModules.actions;

export const getPages = createSelector(
  [(state: State) => state.key, (state: State) => state.zoom],
  (key, zoom) => ({
    key,
    zoom,
    css: PageSize[key].css,
    width: PageSize[key].width,
    height: PageSize[key].height,
    zoomFactor: ZoomFactors[zoom],
  })
);
