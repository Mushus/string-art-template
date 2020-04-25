import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isOpen: boolean;
  templateIndex: number;
  threadIndex: number;
}

const initialState: State = {
  isOpen: false,
  templateIndex: 0,
  threadIndex: 0,
};

const threadDialog = createSlice({
  name: 'threadDialog',
  initialState,
  reducers: {
    open(
      state: State,
      action: PayloadAction<{
        templateIndex: number;
        threadIndex: number;
      }>
    ) {
      const { templateIndex, threadIndex } = action.payload;
      state.isOpen = true;
      state.templateIndex = templateIndex;
      state.threadIndex = threadIndex;
    },

    close(state: State) {
      state.isOpen = false;
    },
  },
});

export default threadDialog;

export const actions = threadDialog.actions;
