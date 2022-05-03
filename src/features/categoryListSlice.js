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
            state.categoryList = state.categoryList.filter((category) => category.id !== action.payload);
        },
        editCategoryTitle: (state, action) => {
            const index = state.categoryList.findIndex(category => category.id === action.payload.id);
            state.categoryList[index].title = action.payload.title;
        }
    }
});

export const { addCategory, deleteCategory, editCategoryTitle} = categoryListSlice.actions;

export const getCategoryList = state => state.categories.categoryList;

export default categoryListSlice.reducer;