import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PageSize from '~/constants/pageSize';
import ZoomFactors from '~/constants/zoomFactor';
import AuxiliaryLineColors from '~/constants/auxiliaryLineColors';
import {
  State,
  AuxiliaryLine,
  TemplateProps,
  TemplatePropsArray,
} from './types';

const defaultPageKey = 'a4p';
const defaultPage = PageSize[defaultPageKey];
const initialState: State = {
  templates: [
    {
      type: 'circle',
      radius: 75,
      pinNum: 24,
      intervalRatio: 1,
      auxiliaryLines: [],
    },
  ],
  auxiliaryLineDialog: {
    isOpen: false,
    templateIndex: 0,
    auxiliaryLineIndex: 0,
  },
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
    updateTemplates(state: State, action: PayloadAction<TemplatePropsArray>) {
      state.templates = action.payload;
    },
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
      action: PayloadAction<{ templateIndex: number }>
    ) {
      const { templateIndex } = action.payload;
      const shape = state.templates[templateIndex];
      if (!shape || !('auxiliaryLines' in shape)) return;
      const auxiliaryLineColorIndex = Math.floor(
        Math.random() * AuxiliaryLineColors.length
      );
      shape.auxiliaryLines.push({
        color: AuxiliaryLineColors[auxiliaryLineColorIndex],
        patterns: [],
        start: 0,
        loopCount: 1000,
      });
    },

    updateAuxiliaryLine(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        auxiliaryLineIndex: number;
        props: AuxiliaryLine;
      }>
    ) {
      const { templateIndex, auxiliaryLineIndex, props } = action.payload;
      const shape = state.templates[templateIndex];
      if (!shape || !('auxiliaryLines' in shape)) return;
      shape.auxiliaryLines[auxiliaryLineIndex] = props;
    },

    removeAuxiliaryLine(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        auxiliaryLineIndex: number;
      }>
    ) {
      const { templateIndex, auxiliaryLineIndex } = action.payload;
      const shape = state.templates[templateIndex];
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

    openAuxiliaryLineDialog(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        auxiliaryLineIndex: number;
      }>
    ) {
      state.auxiliaryLineDialog = {
        isOpen: true,
        ...action.payload,
      };
    },

    closeAuxiliaryLineDialog(state: State) {
      state.auxiliaryLineDialog.isOpen = false;
    },
  },
});

export default canvasModule;

export const actions = canvasModule.actions;
