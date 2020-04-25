import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  withPinNumber: boolean;
  withProcedure: boolean;
  withParams: boolean;
  pinSize: number;
}

const initialState: State = {
  withPinNumber: true,
  withProcedure: false,
  withParams: false,
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
    updateWithProcedure(state, actions: PayloadAction<boolean>) {
      state.withProcedure = actions.payload;
    },
    updateWithParams(state, actions: PayloadAction<boolean>) {
      state.withParams = actions.payload;
    },
  },
});

export const actions = printOptionsModule.actions;

export default printOptionsModule;
