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
        alert(`Submitting Name ${title} & ${description}`);
    }

    // clear form data after submitting
    const clearForm = () => {
        setTitle("");
        setDescription("");
    }

    // limit the character count of task title
    // make fields required

    return (
        <form getByTestId="form" onSubmit={handleSubmit}>
            <label>
                Task Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Task Description
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}