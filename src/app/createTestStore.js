import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "../features/taskListSlice";
import categoryListSlice from "../features/categoryListSlice";

const reducer = {
    tasks: taskListSlice,
    categories: categoryListSlice,
};

export const testStore = configureStore({
    reducer,
});
