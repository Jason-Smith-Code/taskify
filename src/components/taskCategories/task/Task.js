import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Task.css";
import {
    deleteTask,
    showDescription,
    isComplete,
    editTask,
} from "../../../features/taskListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCategoryList } from "../../../features/categoryListSlice";
import React from "react";
import { useForm } from "react-hook-form";

export const Task = (task) => {
    const selectedCategories = useSelector(getCategoryList);
    const maxTitleSize = 40;
    const iconSize = "xl";
    const dispatch = useDispatch();

    const preloadedValues = {
        editTitle: task.title,
        editDescription: task.description,
        editCategory: task.category,
    };

    const { register } = useForm({
        defaultValues: preloadedValues,
    });

    const taskId = task.id;
    // Edit task
    const [newTitle, setNewtitle] = useState(preloadedValues.editTitle);
    const [newCategory, setNewCategory] = useState(
        preloadedValues.editCategory
    );
    const [newDescription, setNewDescription] = useState(
        preloadedValues.editDescription
    );
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState(maxTitleSize);

    const toggleEditMode = () => {
        setEditing((current) => !current);
    };

    const completeTask = () => {
        dispatch(isComplete(task.id));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            editTask({
                id: taskId,
                title: newTitle,
                description: newDescription,
                category: parseInt(newCategory),
            })
        );
        setEditing(false);
    };

    const onTaskTitleChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size);
        setNewtitle(e.target.value);
    };

    const changeCategory = (e) => {
        setNewCategory(e.target.value);
    };

    const showTaskDescription = () => {
        dispatch(showDescription(task.id));
    };

    return (
        <div
            className={
                task.completed === true ? "task-item-completed" : "task-item"
            }
            data-testid={task.title}
        >
            {isEditing === false ? (
                <>
                    <div className="task-top-row">
                        <div className="task-top-left-icons">
                            {/* View button */}
                            <button
                                data-testid="task-item-inspect"
                                className="icon-button icon-margin-right"
                                onClick={showTaskDescription}
                            >
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    size={iconSize}
                                />
                            </button>
                            {/* Edit button */}
                            {task.completed === true ? (
                                ""
                            ) : (
                                <button
                                    data-testid="task-item-edit"
                                    className="icon-button"
                                    onClick={toggleEditMode}
                                >
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        size={iconSize}
                                    />
                                </button>
                            )}
                        </div>
                        {/* delete task button */}
                        <button
                            data-testid="task-item-delete"
                            className="icon-button"
                            onClick={() => dispatch(deleteTask(task.id))}
                        >
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                size={iconSize}
                            />
                        </button>
                    </div>

                    <div className="task-title-description-container">
                        <h3 className="task-title">{task.title}</h3>
                        {task.show === false ? (
                            ""
                        ) : (
                            <div className="task-hidden-contents-container">
                                <p
                                    className="task-description"
                                    data-testid="task-description"
                                >
                                    {task.description}
                                </p>
                                {task.completed === true ? (
                                    <button
                                        type="button"
                                        onClick={completeTask}
                                        className="form-submit"
                                    >
                                        Undo Complete
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={completeTask}
                                        className="form-submit"
                                    >
                                        Complete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                ""
            )}
            {isEditing === true ? (
                <form onSubmit={handleSubmit}>
                    <input
                        {...register("editTitle")}
                        required={true}
                        data-testid="edit-task-title-input"
                        type="text"
                        name="editTitle"
                        value={newTitle}
                        maxLength={maxTitleSize}
                        onChange={(e) => onTaskTitleChange(e)}
                    ></input>
                    <p
                        className="form-message"
                        data-testid="task-edit-title-required"
                    >
                        {newTitle.length > 0 ? "" : "New Title Required"}
                    </p>
                    <p className="form-message" data-testid="form-message">
                        Remaining characters: {characters}
                    </p>

                    <div className="form-group">
                        <textarea
                            {...register("editDescription")}
                            required={true}
                            name="editDescription"
                            data-testid="adding-task-form-input-description"
                            type="text"
                            value={newDescription}
                            onChange={(event) =>
                                setNewDescription(event.target.value)
                            }
                        />
                        <p
                            className="form-message"
                            data-testid="task-edit-description-required"
                        >
                            {newDescription.length > 0
                                ? ""
                                : "Description Required"}
                        </p>
                    </div>
                    <div>
                        <label>Select a category</label>
                        <div className="options-container"></div>
                        {selectedCategories.map((item) => {
                            return (
                                <div key={item.id} className="radio-row">
                                    <input
                                        {...register("editCategory")}
                                        data-testid={`${item.title} radio`}
                                        name="editCategory"
                                        type="radio"
                                        value={item.id}
                                        defaultChecked={
                                            task.category === item.id
                                        }
                                        onChange={changeCategory}
                                        className="category-button"
                                    />
                                    <p>{item.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form Submit */}
                    {newTitle.length === 0 || newDescription.length === 0 ? (
                        ""
                    ) : (
                        <button
                            className="form-submit"
                            type="submit"
                            value="Submit"
                        >
                            Confirm
                        </button>
                    )}
                </form>
            ) : (
                ""
            )}
        </div>
    );
};
