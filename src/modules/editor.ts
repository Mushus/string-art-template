import { TemplateProps, Data, Thread } from '~/modules/data/current';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThreadColors from '~/constants/threadColors';

export interface State {
  data: Data;
}
const initialState: State = {
  data: {
    version: 1,
    templates: [
      {
        type: 'circle',
        radius: 75,
        pinNum: 24,
        intervalRatio: 1,
        threads: [],
      },
    ],
  },
};

const editorModule = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateData(state: State, action: PayloadAction<Data>) {
      state.data = action.payload;
    },
    addShape(
      state: State,
      action: PayloadAction<{ props: TemplateProps } | undefined>
    ) {
      state.data.templates.push(action.payload?.props ?? { type: 'none' });
    },

    updateShape(
      state: State,
      action: PayloadAction<{ index: number; props: TemplateProps }>
    ) {
      const { index, props } = action.payload;
      state.data.templates[index] = props;
    },

    removeShape(state: State, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      state.data.templates.splice(index, 1);
    },

    addThread(state: State, action: PayloadAction<{ templateIndex: number }>) {
      const { templateIndex } = action.payload;
      const shape = state.data.templates[templateIndex];
      if (!shape || !('threads' in shape)) return;
      const threadColorIndex = Math.floor(Math.random() * ThreadColors.length);
      shape.threads.push({
        color: ThreadColors[threadColorIndex],
        patterns: [],
        start: 0,
        loopCount: 1000,
      });
    },

    updateThread(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        threadIndex: number;
        props: Thread;
      }>
    ) {
      const { templateIndex, threadIndex, props } = action.payload;
      const shape = state.data.templates[templateIndex];
      if (!shape || !('threads' in shape)) return;
      shape.threads[threadIndex] = props;
    },

    removeThread(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        threadIndex: number;
      }>
    ) {
      const { templateIndex, threadIndex } = action.payload;
      const shape = state.data.templates[templateIndex];
      if (!shape || !('threads' in shape)) return;
      shape.threads.splice(threadIndex, 1);
    },
  },
});

export const actions = editorModule.actions;

export default editorModule;
