import { createSlice } from '@reduxjs/toolkit';

// Create a taskList slice using createSlice
// Give it a name, an initial state which will hold the tasks
// Give it a reducer addTask which I will use to add tasks to the state

export const taskListSlice = createSlice({
    name: "tasks",
    initialState: {
        taskList: []
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks = action.payload
        }
    }
})

export const { addTask } = taskListSlice.actions;


export default taskListSlice.reducer;