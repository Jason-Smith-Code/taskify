import { createSlice } from '@reduxjs/toolkit';

export const categoryListSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryList: []
    },
    reducers: {
        addCategory: (state, action) => {
            state.categoryList = action.payload;
        }
    }
})

export const { addCategory } = categoryListSlice.actions;

export default categoryListSlice.reducer;