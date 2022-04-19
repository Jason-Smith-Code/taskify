import React, { useState } from "react";
import './Forms.css';

export function CategoryForm() {
    const [category, setCategory] = useState("");
    const [characters, setCharacters] = useState(20)
    const maxTitleSize = 20;

    const handleSubmit = (event) => {
        event.preventDefault();
        clearForm()
    }

    const clearForm = () => {
        setCategory("");
    }

    const onCategoryChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setCategory(e.target.value);
    }

    return (
        <form data-testid="adding-category-form" onSubmit={handleSubmit}>    
            <input
                required={true}
                data-testid='adding-category-form-input-title'
                placeholder="Enter category Title"
                type="text"
                value={category}
                maxLength={maxTitleSize}
                onChange={(e) => onCategoryChange(e)}
            />
            <p className="form-message">{category.length > 0 ? "" : "Title Required"}</p>
            <p className="form-message">Remaining characters: {characters}</p>
            <p className="form-message">{category.length === maxTitleSize ? "Character cap reached" : ""}</p>
            {/* Disable submit while both input field conditions are not met */}
            <button data-testid='adding-task-submit' id="submtButton" type="submit" value="Submit">Add Task</button>
        </form>
    )
}