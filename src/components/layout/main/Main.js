import './Main.css';
import React from "react";
import { TaskForm } from '../../forms/TaskForm';
import Button from '../../button/Button';

export function Main() {
    return(
        <div id="main">
            <div className="column adding-column">
                <div className="adding-column-split add-tasks">
                    <h2>Add tasks</h2>
                    <p>Add a button, which expands into a form to add a task. The form will simply ask for a Title and a Description</p>
                    <TaskForm />
                </div>
                <div className="adding-column-split add-categories">
                    <h2>Add categories</h2>
                    <Button label="Hello" id="Jason"></Button>
                    <p>create a button (text field) which adds a category column, the text field will be the name of the category</p>
                </div>
            </div>
            <div className="column category-column pending-column">
                <h2>Pending tasks</h2>
                <p>All newly created tasks will go here</p>
            </div>
            <div className="column category-column column-1">
                <h2>Category 1 tasks</h2>
                <p>Tasks can be dragged and dropped into any one of these columns, to sort and organise them</p>
                <p>Tasks can also be moved up and down each column to present a heirachi of importance</p>
            </div>
            <div className="column category-column column-2">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column category-column column-3">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column completed-column">
                <h2>Completed tasks</h2>
            </div>
        </div>
    )
}