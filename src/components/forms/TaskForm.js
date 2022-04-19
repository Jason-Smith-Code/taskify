import React, { useState } from "react";
import './Forms.css';

export function TaskForm() {
    // we need to monitor the state of the 2 items in the form, title, description.
    // use state will be expecting a string, so we will use an empty string in the useState

    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(20);
    const [description, setDescription] = useState("");
    const maxTitleSize = 20;
    const minLengthDescription = 50;

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === "" || description === "") {
            console.log("a field is empty, form cannot be submitted")
            return
        }
        clearForm()
        console.log(`Submitting Name ${title} & ${description}`);
        
    }

    // clear form data after submitting
    const clearForm = () => {
        setTitle("");
        setDescription("");
        setCharacters(20);
    }

    const onChangeTitle = (e) => {
        // we want to show the user how many remaining characters available for them to use
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setTitle(e.target.value);

    }

    return (
        <form data-testid="adding-task-form" onSubmit={handleSubmit}>
            <label>
                
                <input
                    required={true}
                    data-testid='adding-task-form-input-title'
                    placeholder="Enter Task Title"
                    type="text"
                    value={title}
                    maxLength={maxTitleSize}
                    onChange={(e) => onChangeTitle(e)}
                />
                <p>{title.length > 0 ? "" : "Title Required"}</p>
                <p>Remaining characters: {characters}</p>
                <p>{title.length === maxTitleSize ? "Character cap reached" : ""}</p>
            </label>
            <label>
                
                <textarea
                    required={true}
                    data-testid='adding-task-form-input-description'
                    type="text"
                    placeholder="Enter Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            {/* Disable submit while both input field conditions are not met */}
            <button data-testid='adding-task-submit' id="submtButton" type="submit" value="Submit">Add Task</button>
        </form>
    )
}