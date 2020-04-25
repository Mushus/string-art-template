import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  withPinNumber: boolean;
  withProcedure: boolean;
  pinSize: number;
}

const initialState: State = {
  withPinNumber: true,
  withProcedure: false,
  pinSize: 0.3,
};

const printOptionsModule = createSlice({
  name: 'printOptions',
  initialState,
  reducers: {
    updateWithPinNumber(state, actions: PayloadAction<boolean>) {
      state.withPinNumber = actions.payload;
    },
    updatePinSize(state, actions: PayloadAction<number>) {
      state.pinSize = actions.payload;
    },
    updateProcedure(state, actions: PayloadAction<boolean>) {
      state.withProcedure = actions.payload;
    },
  },
});

export const actions = printOptionsModule.actions;

export default printOptionsModule;
