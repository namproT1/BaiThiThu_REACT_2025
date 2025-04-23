import { configureStore } from '@reduxjs/toolkit';
import xeReducer from './xeSlice';

export const store = configureStore({
  reducer: {
    xe: xeReducer
  }
});
