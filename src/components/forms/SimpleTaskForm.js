import React, { useState } from "react";
import "./Forms.css";
import { addTask } from "../../features/taskListSlice";
import { useDispatch } from "react-redux";

export function SimpleTaskForm(props) {
    const maxTitleSize = 40;
    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(maxTitleSize);
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(
            addTask({
                id: Date.now(),
                title: title,
                description: description,
                show: false,
                completed: false,
                category: props.id,
            })
        );
        clearForm();
    };

    // clear form data after submitting
    const clearForm = () => {
        setTitle("");
        setDescription("");
        setCharacters(maxTitleSize);
    };

    const onChangeTitle = (e) => {
        // we want to show the user how many remaining characters available for them to use
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size);
        setTitle(e.target.value);
    };

    return (
        <form
            className="padded"
            id="task-form"
            data-testid="simple-adding-task-form"
            onSubmit={handleSubmit}
        >
            <div className="form-header">
                <h2>Add a Task to {props.title}</h2>
            </div>
            <div className="form-group">
                <input
                    required={true}
                    data-testid="adding-task-form-input-title"
                    placeholder="Enter Task Title"
                    type="text"
                    value={title}
                    maxLength={maxTitleSize}
                    onChange={(e) => onChangeTitle(e)}
                />
                <p className="form-message">
                    {title.length > 0 ? "" : "Title Required"}
                </p>
                <p className="form-message">
                    Remaining characters: {characters}
                </p>
                {title.length === maxTitleSize ? (
                    <p className="form-message" data-testid="cap-reached">
                        Character cap reached
                    </p>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <textarea
                    required={true}
                    data-testid="adding-task-form-input-description"
                    type="text"
                    placeholder="Enter Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p className="form-message">
                    {description.length > 0 ? "" : "Description Required"}
                </p>
            </div>

            {/* Form Submit */}
            {title.length === 0 || description.length === 0 ? (
                ""
            ) : (
                <button
                    className="form-submit"
                    data-testid="adding-task-submit"
                    id="task-submit-button"
                    type="submit"
                    value="Submit"
                >
                    Add Task
                </button>
            )}
        </form>
    );
}
