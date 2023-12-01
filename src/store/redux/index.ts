import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

import {reducers} from './slices';

const middlewares: any[] = [];

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './slices';
