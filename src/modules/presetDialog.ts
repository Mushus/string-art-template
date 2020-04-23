import { createSlice } from '@reduxjs/toolkit';

export interface State {
  isOpen: boolean;
}

const initialState: State = {
  isOpen: false,
};

const presetDialogModule = createSlice({
  name: 'presetDialog',
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
    },
    close(state) {
      state.isOpen = false;
    },
  },
});

export const actions = presetDialogModule.actions;

export default presetDialogModule;
