import { SimpleTaskForm } from "../components/forms/SimpleTaskForm";
import { getTaskList } from "../features/taskListSlice";
import { useSelector } from "react-redux";
import "./CategoryTemplates.css";
import { Task } from "../components/taskCategories/task/Task";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function CategoryTemplate(category) {
    const originalTaskList = useSelector(getTaskList);

    let newList = originalTaskList.filter(
        (task) => task.category === category.id
    );

    function orderedList() {
        // this list will show completed tasks at the bottom of the list
        let orderedArray = [];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].completed === false) {
                orderedArray.push(newList[i]);
            }
        }
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].completed === true) {
                orderedArray.push(newList[i]);
            }
        }

        return orderedArray.map((task) => (
            <Task
                data-testid={task.title}
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
                <Link
                    role="link"
                    className="menu-link"
                    to="/taskify"
                    path="/taskify"
                >
                    <FontAwesomeIcon
                        className="icon-margin-right"
                        icon={faRotateLeft}
                    />
                    Go back
                </Link>
                <h2 className="category-title-container fit-content">
                    Category: {category.title}
                </h2>
                {orderedList()}
            </div>
        </div>
    );
}
