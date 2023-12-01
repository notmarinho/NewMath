import {createSlice} from '@reduxjs/toolkit';

type AppState = {
  initialLoading: boolean;
};

const initialState: AppState = {
  initialLoading: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
