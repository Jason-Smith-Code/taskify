import React, { useState } from "react";

export function TaskForm(props) {
    // we need to monitor the state of the 2 items in the form, title, description.
    // use state will be expecting a string, so we will use an empty string in the useState
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        clearForm()
        console.log(`Submitting Name ${title} & ${description}`);
    }

    // clear form data after submitting
    const clearForm = () => {
        setTitle("");
        setDescription("");
    }

    // limit the character count of task title
    // make fields required
    return (
        <form data-testid="adding-task-form" onSubmit={handleSubmit}>
            <label>
                Task Title
                <input
                    required={true}
                    data-testid='adding-task-form-input-title'
                    placeholder="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Task Description
                <textarea
                    required={true}
                    data-testid='adding-task-form-input-description'
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <input data-testid='adding-task-submit' type="submit" value="Submit" />
        </form>
    )
}