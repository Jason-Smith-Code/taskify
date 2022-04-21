import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from '../features/taskListSlice';
import categoryListSlice from '../features/categoryListSlice';

export const store = configureStore({
  reducer: {
    tasks: taskListSlice,
    categories: categoryListSlice
    
  },
})