import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PageSize from '~/constants/pageSize';
import ZoomFactors from '~/constants/zoomFactor';
import AuxiliaryLineColors from '~/constants/auxiliaryLineColors';

export interface AuxiliaryLine {
  color: string;
  patterns: number[];
  start: number;
}

export interface PropsNone {
  type: 'none';
}

export interface PropsCircle {
  type: 'circle';
  radius: number;
  pinNum: number;
  intervalRatio: number;
  auxiliaryLines: AuxiliaryLine[];
}

export interface PropsPolygon {
  type: 'polygon';
  radius: number;
  vertexNum: number;
  pinNum: number;
  auxiliaryLines: AuxiliaryLine[];
}

export interface PropsStar {
  type: 'star';
  outerRadius: number;
  innerRadius: number;
  vertexNum: number;
  pinNum: number;
  auxiliaryLines: AuxiliaryLine[];
}

export type TemplateProps = PropsNone | PropsCircle | PropsPolygon | PropsStar;

export interface State {
  templates: Array<TemplateProps>;
  page: {
    key: string;
    width: number;
    height: number;
    zoom: number;
    zoomFactor: number;
  };
}

const defaultPageKey = 'a4p';
const defaultPage = PageSize[defaultPageKey];
const initialState: State = {
  templates: [
    {
      type: 'circle',
      radius: 50,
      pinNum: 24,
      intervalRatio: 1,
      auxiliaryLines: [],
    },
  ],
  page: {
    key: defaultPageKey,
    width: defaultPage.width,
    height: defaultPage.height,
    zoom: 0,
    zoomFactor: 1,
  },
};

const canvasModule = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addShape(
      state: State,
      action: PayloadAction<{ props: TemplateProps } | undefined>
    ) {
      state.templates.push(action.payload?.props ?? { type: 'none' });
    },

    updateShape(
      state: State,
      action: PayloadAction<{ index: number; props: TemplateProps }>
    ) {
      const { index, props } = action.payload;
      state.templates[index] = props;
    },

    removeShape(state: State, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.templates.splice(index, 1);
    },

    addAuxiliaryLine(
      state: State,
      action: PayloadAction<{ shapeIndex: number }>
    ) {
      const { shapeIndex } = action.payload;
      const shape = state.templates[shapeIndex];
      if (!shape || !('auxiliaryLines' in shape)) return;
      const auxiliaryLineColorIndex = Math.floor(
        Math.random() * AuxiliaryLineColors.length
      );
      shape.auxiliaryLines.push({
        color: AuxiliaryLineColors[auxiliaryLineColorIndex],
        patterns: [],
        start: 0,
      });
    },

    updateAuxiliaryLine(
      state: State,
      action: PayloadAction<{
        shapeIndex: number;
        auxiliaryLineIndex: number;
        props: AuxiliaryLine;
      }>
    ) {
      const { shapeIndex, auxiliaryLineIndex, props } = action.payload;
      const shape = state.templates[shapeIndex];
      if (!shape || !('auxiliaryLines' in shape)) return;
      shape.auxiliaryLines[auxiliaryLineIndex] = props;
    },

    removeAuxiliaryLine(
      state: State,
      action: PayloadAction<{ shapeIndex: number; auxiliaryLineIndex: number }>
    ) {
      const { shapeIndex, auxiliaryLineIndex } = action.payload;
      const shape = state.templates[shapeIndex];
      if (!shape || !('auxiliaryLines' in shape)) return;
      shape.auxiliaryLines.splice(auxiliaryLineIndex, 1);
    },

    setPage(state: State, action: PayloadAction<{ key: string }>) {
      const { key } = action.payload;
      const pageSize = PageSize[key];
      if (!pageSize) return;
      state.page.key = key;
      state.page.width = pageSize.width;
      state.page.height = pageSize.height;
    },

    zoomIn(state: State) {
      const zoom = +state.page.zoom + 1;
      if (!ZoomFactors[zoom]) return;
      state.page.zoom = zoom;
      state.page.zoomFactor = ZoomFactors[zoom];
    },
    zoomOut(state: State) {
      const zoom = +state.page.zoom - 1;
      if (!ZoomFactors[zoom]) return;
      state.page.zoom = zoom;
      state.page.zoomFactor = ZoomFactors[zoom];
    },
  },
});

export default canvasModule;

export const actions = canvasModule.actions;
export const reducers = canvasModule.reducer;
