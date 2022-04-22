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
            state.taskList.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.key !== action.payload);
        }
        // removeItemFromCart: (state, action) => {
        //     state.cartItems = state.cartItems.filter(
        //         cartItem => cartItem.id !== action.payload.cartItemId
        //     )
        // }
    }
})

export const { addTask, deleteTask} = taskListSlice.actions;


export const getTaskList = state => state.tasks.taskList;

export default taskListSlice.reducer;