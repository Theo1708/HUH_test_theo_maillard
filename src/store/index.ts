import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import toDoListReducer from './slices/toDoListSlice';

const reducers = combineReducers({
  toDoList: toDoListReducer,
});

export const store = configureStore({
  reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;