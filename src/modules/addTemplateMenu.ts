import { createSlice } from '@reduxjs/toolkit';

export interface State {
  isOpen: boolean;
}

const initialState: State = {
  isOpen: false,
};

const addTemplateMenuModule = createSlice({
  name: 'addTemplateMenu',
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

export const actions = addTemplateMenuModule.actions;

export default addTemplateMenuModule;
