import './Main.css';
import React from "react";
import { TaskForm } from '../../forms/TaskForm';
import { CategoryForm } from '../../forms/CategoryForm';
import { TaskCategories } from '../../taskCategories/TaskCategories';

export function Main() {
    return(
        <div id="main">
            <div className="column adding-column">
                <div className="adding-column-split add-tasks">
                    <h2>Add tasks</h2>
                    <TaskForm />
                </div>
                <div className="adding-column-split add-categories">
                    <h2>Add categories</h2>
                    <CategoryForm />
                </div>
            </div>
            <TaskCategories />
        </div>
    )
}