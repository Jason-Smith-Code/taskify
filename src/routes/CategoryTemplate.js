import { SimpleTaskForm } from "../components/forms/SimpleTaskForm";
import { getTaskList } from "../features/taskListSlice";
import { useSelector } from "react-redux";
import "./CategoryTemplates.css";
import { Task } from "../components/taskCategories/task/Task";
import React from "react";

export default function CategoryTemplate(category) {
    const originalTaskList = useSelector(getTaskList);
    function filterCategoryList() {
        const newList = originalTaskList.filter(
            (task) => task.category === category.id
        );
        return newList.map((task) => (
            <Task
                key={task.id}
                title={task.title}
                id={task.id}
                description={task.description}
                show={task.show}
                completed={task.completed}
                category={task.category}
            />
        ));
    }

    return (
        <div id="main">
            <div id="forms-column" className="column">
                <SimpleTaskForm id={category.id} title={category.title} />
            </div>
            <div className="task-container">
                <h2 className="category-title-container fit-content">
                    Category: {category.title}
                </h2>
                {filterCategoryList()}
            </div>
        </div>
    );
}
