import { createSlice } from '@reduxjs/toolkit';

export const categoryListSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryList: []
    },
    reducers: {
        addCategory: (state, action) => {
            state.categoryList.push(action.payload)
        }
    }
})

export const { addCategory } = categoryListSlice.actions;

export const getGetCategoryList = state => state.categories.categoryList;

export default categoryListSlice.reducer;