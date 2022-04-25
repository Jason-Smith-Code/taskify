import './Main.css';
import React from "react";
import { TaskForm } from '../../forms/TaskForm';
import { TaskCategories } from '../../taskCategories/TaskCategories';

export function Main() {
    return(
        <div id="main">
            <div className="column">
                <TaskForm />
            </div>
            <TaskCategories />
        </div>
    )
}