import "./Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import {
    deleteCategory,
    editCategoryTitle,
    getCategoryTitleStrings,
} from "../../../features/categoryListSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { getTaskList } from "../../../features/taskListSlice";
import { Task } from "../task/Task";
import { deleteTask } from "../../../features/taskListSlice";
import { Link } from "react-router-dom";
import { RemoveSpaces } from "../../../utilities/RemoveSpaces";
import { useForm } from "react-hook-form";

export const Category = (category) => {
    const iconSize = "xl";
    const categoryId = category.id;
    const dispatch = useDispatch();
    const originalTaskList = useSelector(getTaskList);

    // remove the current categgory from the catergoryStrings array
    const catergoryStrings = useSelector(getCategoryTitleStrings);

    let newList = originalTaskList.filter(
        (task) => task.category === category.id
    );

    const preloadedValues = {
        editTitle: category.title,
    };

    const { register } = useForm({
        defaultValues: preloadedValues,
    });

    const [newTitle, setNewtitle] = useState(preloadedValues.editTitle);
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState();
    const [titleMatch, setTitleMatch] = useState(false);
    const maxTitleSize = 20;

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

    // clicking the edit button toggles edit mode
    const toggleEditMode = () => {
        setEditing((current) => !current);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            editCategoryTitle({
                id: categoryId,
                title: newTitle,
            })
        );
        setEditing(false);
    };

    function removeCurrentCategoryTitle(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const onCategoryChange = (e) => {
        let size = e.target.value.replace(/[^\w\s]/gi, "").length;
        removeCurrentCategoryTitle(catergoryStrings, category.title);
        const exists = catergoryStrings.includes(e.target.value);
        if (exists === true) {
            setTitleMatch(true);
        } else {
            setTitleMatch(false);
        }
        setNewtitle(e.target.value.replace(/[^\w\s]/gi, ""));
        setCharacters(maxTitleSize - size);
    };

    const deletingCategory = () => {
        deleteAllCategoryTasks();
        dispatch(deleteCategory(category.id));
    };

    const deleteAllCategoryTasks = () => {
        // identfy all tasks in category
        const newList = originalTaskList.filter(
            (task) => task.category === category.id
        );
        // loop through each one dispatching delete task as we go
        for (let i = 0; i < newList.length; i++) {
            dispatch(deleteTask(newList[i].id));
        }
    };

    function confirmDelete() {
        // if the category contains 0 tasks ignore dont show a confirmations
        if (originalTaskList.length > 0) {
            const message =
                "Deleting a category will also delete all tasks inside";
            if (window.confirm(message) === true) {
                deletingCategory();
            } else {
                return;
            }
        } else {
            deletingCategory();
        }
    }

    return (
        <div className="column" data-testid="category-column">
            <div className="category-title-container">
                {isEditing === false ? (
                    <div className="category-icon-contanier">
                        <button
                            data-testid="edit-category-button"
                            className="icon-button"
                            onClick={toggleEditMode}
                        >
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                size={iconSize}
                                className="category-icons"
                            />
                        </button>
                        <button
                            data-testid="delete-category-button"
                            className="icon-button"
                            onClick={confirmDelete}
                        >
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                size={iconSize}
                                className="category-icons"
                            />
                        </button>
                    </div>
                ) : (
                    ""
                )}
                {isEditing === true ? (
                    <form onSubmit={handleSubmit}>
                        <label>Set new Title</label>
                        <input
                            data-testid="edit-category-title-input"
                            {...register("editTitle")}
                            type="text"
                            value={newTitle}
                            maxLength={maxTitleSize}
                            onChange={(e) => onCategoryChange(e)}
                        ></input>
                        {newTitle.length > 0 ? (
                            ""
                        ) : (
                            <p className="form-message">Title Required</p>
                        )}
                        {titleMatch ? (
                            <p className="form-message">
                                Another category exists with the same title"
                            </p>
                        ) : (
                            ""
                        )}
                        {characters === undefined ? (
                            ""
                        ) : (
                            <p className="form-message">
                                Remaining characters: {characters}
                            </p>
                        )}
                        {(newTitle.length > 0) & (titleMatch === false) ? (
                            <button
                                className="form-submit"
                                type="submit"
                                value="Submit"
                            >
                                Confirm
                            </button>
                        ) : (
                            ""
                        )}
                    </form>
                ) : (
                    <h2 data-testid="category-title">
                        <Link
                            className="category-heading-link"
                            path={`/category/${RemoveSpaces(category.title)}`}
                            to={`/category/${RemoveSpaces(category.title)}`}
                        >
                            <FontAwesomeIcon
                                className="icon-margin-right"
                                icon={faFolder}
                            />
                            {category.title} ( {newList.length} )
                        </Link>
                    </h2>
                )}
            </div>
            {/* map out tasks in this category */}
            <div className="tasks-container">{orderedList()}</div>
        </div>
    );
};
