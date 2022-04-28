import './Main.css';
import React from "react";
import { TaskForm } from '../../forms/TaskForm';
import { TaskCategories } from '../../taskCategories/TaskCategories';
import { Completed } from '../../taskCategories/completed/Completed';
import { CategoryForm } from '../../forms/CategoryForm';

export function Main() {
    return(
        <div id="main">
            <div className="column">
                <CategoryForm />
                <TaskForm />  
            </div>
            <TaskCategories />
            <Completed />
        </div>
    )
}