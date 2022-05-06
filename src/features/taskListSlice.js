import { createSlice } from '@reduxjs/toolkit';

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
            state.taskList = state.taskList.filter((task) => task.id !== action.payload);
        },
        showDescription: (state, action) => {
            const task = state.taskList.find((task) => task.id === action.payload);
            if (task) {
                task.show = !task.show
            }
        },
        isComplete: (state, action) => {
            const task = state.taskList.find((task) => task.id === action.payload);
            task.completed = true;
            task.category = "complete"
        },
        editTask: (state, action) => {
            const index = state.taskList.findIndex(task => task.id === action.payload.id);
            state.taskList[index].title = action.payload.title;
            state.taskList[index].category = action.payload.category;
            state.taskList[index].description = action.payload.description;
        }
    }
})

export const { addTask, deleteTask, showDescription, isComplete, editTask} = taskListSlice.actions;


export const getTaskList = state => state.tasks.taskList;

export default taskListSlice.reducer;