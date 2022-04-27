import React, { useState } from "react";
import './Forms.css';
import { addTask } from "../../features/taskListSlice";
import { useDispatch } from "react-redux";
import {GenerateUniqueId} from "../../utilities/GenerateUniqueId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { getGetCategoryList } from "../../features/categoryListSlice";
import { useSelector } from "react-redux";

export function TaskForm() {
    // we need to monitor the state of the 2 items in the form, title, description.
    // use state will be expecting a string, so we will use an empty string in the useState
    const selectedCategories = useSelector(getGetCategoryList);

    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(20);
    const [description, setDescription] = useState("");
    const [selectedCatgory, setSelectedCategory] = useState(selectedCategories[0].title);
    const maxTitleSize = 20;

    const dispatch = useDispatch();
    

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === "" || description === "") {
            console.log("a field is empty, form cannot be submitted")
            return
        }
        const uniqueNumber = GenerateUniqueId();
        dispatch(addTask({
            id: uniqueNumber,
            title: title,
            description: description,
            show: false,
            completed: false,
            category: selectedCatgory 
        }))
        clearForm()  
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

    const onChangeCategory = (e) => {
        // we want to show the user how many remaining characters available for them to use
        setSelectedCategory(e.target.value);
        console.log(e)
    }

    return (
        <form className="padded" data-testid="adding-task-form" onSubmit={handleSubmit}>
            <div className="form-header"><h2>Add Task</h2> <FontAwesomeIcon icon={faCirclePlus} /></div>
            <input
                required={true}
                data-testid='adding-task-form-input-title'
                placeholder="Enter Task Title"
                type="text"
                value={title}
                maxLength={maxTitleSize}
                onChange={(e) => onChangeTitle(e)}
            />
            <p className="form-message">{title.length > 0 ? "" : "Title Required"}</p>
            <p className="form-message">Remaining characters: {characters}</p>
            {title.length === maxTitleSize ? <p className="form-message" data-testid='cap-reached'>Character cap reached</p> : ""}
            
            <textarea
                required={true}
                data-testid='adding-task-form-input-description'
                type="text"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <p className="form-message">{description.length > 0 ? "" : "Description Required"}</p>
            {/* Disable submit while both input field conditions are not met */}
            {selectedCategories.length < 1 ? <p>Please add a category</p> : 
                    <label>Select category
                        <select 
                        id="select-category"
                        value={selectedCatgory}
                        onChange={(e) => onChangeCategory(e)}
                        >
                            {selectedCategories.map(item => <option className="text" key={item.id}>{item.title}</option>)}
                        </select>
                    </label>
            }


            <button className="form-submit" data-testid='adding-task-submit' id="submitButton" type="submit" value="Submit">Add Task</button>
        </form>
    )
}