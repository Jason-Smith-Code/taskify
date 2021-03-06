import React, { useState } from "react";
import "./Forms.css";
import { addTask } from "../../features/taskListSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../features/categoryListSlice";

export function TaskForm() {
    const selectedCategories = useSelector(getCategoryList);
    const maxTitleSize = 40;

    function getFirstTitle() {
        if (selectedCategories.length > 0) {
            return selectedCategories[0].title;
        } else {
            return null;
        }
    }

    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(maxTitleSize);
    const [description, setDescription] = useState("");
    const [selectedCatgory, setSelectedCategory] = useState(getFirstTitle());

    const dispatch = useDispatch();

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("task submit button clicked");

        dispatch(
            addTask({
                id: Date.now(),
                title: title,
                description: description,
                show: false,
                completed: false,
                category: parseInt(selectedCatgory),
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

    const onCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        // if there are no categories, do not render the task form
        <>
            {selectedCategories < 1 ? (
                ""
            ) : (
                <form
                    className="padded"
                    id="task-form"
                    data-testid="adding-task-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-header">
                        <h2>Add a Task</h2>
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
                            <p
                                className="form-message"
                                data-testid="cap-reached"
                            >
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
                            {description.length > 0
                                ? ""
                                : "Description Required"}
                        </p>
                    </div>

                    <div className="form-group">
                        <label>Select a category</label>
                        <div
                            className="options-container"
                            data-testid="options-container"
                        >
                            {selectedCategories.map((item) => {
                                return (
                                    <div key={item.id} className="radio-row">
                                        <input
                                            required
                                            type="radio"
                                            value={item.id}
                                            name="category-radio"
                                            onChange={onCategoryChange}
                                            className="category-button"
                                        />
                                        <p>{item.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Submit */}
                    {selectedCategories.length < 1 ||
                    selectedCatgory === "" ||
                    selectedCatgory === null ||
                    selectedCatgory === undefined ||
                    title.length === 0 ||
                    description.length === 0 ? (
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
            )}
        </>
    );
}
