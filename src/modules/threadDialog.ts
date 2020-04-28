import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  isOpen: boolean;
  id: string;
}

const initialState: State = {
  isOpen: false,
  id: '',
};

const threadDialog = createSlice({
  name: 'threadDialog',
  initialState,
  reducers: {
    open(state: State, action: PayloadAction<string>) {
      const id = action.payload;
      state.isOpen = true;
      state.id = id;
    },

    close(state: State) {
      state.isOpen = false;
    },
  },
});

export default threadDialog;

export const actions = threadDialog.actions;
