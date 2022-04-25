import React, { useState } from "react";
import './Forms.css';
import { addCategory } from "../../features/categoryListSlice";
import { useDispatch } from "react-redux";
import {GenerateUniqueId} from "../../utilities/GenerateUniqueId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function CategoryForm() {
    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(20);
    const maxTitleSize = 20;

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === ""){
            console.log("a field is empty, form cannot be submitted")
            return
        }
        dispatch(addCategory({
            id: GenerateUniqueId(),
            title: title,
        }));
        clearForm();
    }

    const clearForm = () => {
        setTitle("");
    }

    const onCategoryChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setTitle(e.target.value);
    }

    return (
        <form id="category-form" data-testid="adding-category-form" onSubmit={handleSubmit}>
            <div id="addCategoryButton"><h3>Add category</h3> <FontAwesomeIcon icon={faCirclePlus} /></div>    
            <input
                required={true}
                data-testid='adding-category-form-input-title'
                placeholder="Enter category Title"
                type="text"
                value={title}
                maxLength={maxTitleSize}
                onChange={(e) => onCategoryChange(e)}
            />
            <p className="form-message">{title.length > 0 ? "" : "Title Required"}</p>
            <p className="form-message">Remaining characters: {characters}</p>
            <p className="form-message">{title.length === maxTitleSize ? "Character cap reached" : ""}</p>
            {/* Disable submit while both input field conditions are not met */}
            <button data-testid='adding-task-submit' className="form-submit" type="submit" value="Submit">Add Category</button>
        </form>
    )
}