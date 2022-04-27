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

    const selectedCategories = useSelector(getGetCategoryList);

    function getFirstTitle() {
        if (selectedCategories.length > 0) {
            console.log("selectedCategories length is greater than zero")
            return selectedCategories[0].title
        } else {
            console.log("No categories exist")
            return "No categories exist"
        }
    }

    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(20);
    const [description, setDescription] = useState("");
    const [selectedCatgory, setSelectedCategory] = useState(getFirstTitle());
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
        // console.log(`the selected category was ${selectedCatgory}`)
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

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
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

            {/* {selectedCategories < 1 ? <p>Please create a category</p> :
            <div>
                <label>Select a category</label>
                <br></br>
                {selectedCategories.map(item => <button type="button" required value={item.title} onClick={() => setSelectedCategory(item.title)} className="category-button" key={item.id}>{item.title}</button>)}
            </div>}  */}

            {/* Radio option */}
            <p>{`The current selected category is: ${selectedCatgory}`}</p>
            {selectedCategories < 1 ? <p>Please create a category</p> :
            <div>
                
                <label>Select a category</label>
                <br></br>
                {selectedCategories.map((item, index) => {
                    if (index === 0) {
                        return(
                        <div>
                            <input required type="radio" key={item.id} value={item.title} checked={true} name="category-radio" onChange={handleChange} className="category-button" /><p>{item.title}</p>
                        </div>)
                    } else if (index > 0) {
                        return(
                            <div>
                                <input required type="radio" key={item.id} value={item.title} name="category-radio" onChange={handleChange} className="category-button"/><p>{item.title}</p>
                            </div>
                        )
                    } else return undefined
                }
                )
                }
            </div>} 
            {/* Form Submit */}

            {(selectedCategories.length < 1 ) || (title.length === 0) || (description.length === 0)? "" : <button className="form-submit" data-testid='adding-task-submit' id="submitButton" type="submit" value="Submit">Add Task</button>} 

        </form>
    )
}
