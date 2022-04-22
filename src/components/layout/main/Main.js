import './Main.css';
import React from "react";
import { TaskForm } from '../../forms/TaskForm';
import { TaskCategories } from '../../taskCategories/TaskCategories';

export function Main() {
    return(
        <div id="main">
            <div className="column">
                <div className="">
                    <h2>Add tasks</h2>
                    <TaskForm />
                </div>
            </div>
            <TaskCategories />
        </div>
    )
}