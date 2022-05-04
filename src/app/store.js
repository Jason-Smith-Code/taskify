import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from '../features/taskListSlice';
import categoryListSlice from '../features/categoryListSlice';

import { loadState, saveState } from '../storage/LocalStorage';

const preloadedState = loadState()

const reducer = {
  tasks: taskListSlice,
  categories: categoryListSlice,
}

export const store = configureStore({
  reducer,
  preloadedState
})

store.subscribe(() => {
  saveState(store.getState())
})