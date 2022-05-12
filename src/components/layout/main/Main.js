import "./Main.css";
import React from "react";
import { TaskForm } from "../../forms/TaskForm";
import { TaskCategories } from "../../taskCategories/TaskCategories";
import { CategoryForm } from "../../forms/CategoryForm";

export function Main() {
    return (
        <div id="main">
            <div id="forms-column" className="column">
                <CategoryForm />
                <TaskForm />
            </div>
            <TaskCategories />
        </div>
    );
}
