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
        },
        showDescription: (state, action) => {
            const task = state.taskList.find((task) => task.key === action.payload);
            if (task) {
                task.show = !task.show
            }


        }
    }
})

export const { addTask, deleteTask, showDescription} = taskListSlice.actions;


export const getTaskList = state => state.tasks.taskList;

export default taskListSlice.reducer;