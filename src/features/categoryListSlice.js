import { createSlice } from '@reduxjs/toolkit';

export const categoryListSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryList: []
    },
    reducers: {
        addCategory: (state, action) => {
            state.categoryList.push(action.payload)
        },
        deleteCategory: (state, action) => {
            console.log("deleting category")
            state.categoryList = state.categoryList.filter((category) => category.id !== action.payload);
        }
    }
});

export const { addCategory, deleteCategory} = categoryListSlice.actions;

export const getGetCategoryList = state => state.categories.categoryList;

export default categoryListSlice.reducer;