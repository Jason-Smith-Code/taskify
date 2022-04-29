import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';
import { deleteTask, showDescription, isComplete, editTask } from '../../../features/taskListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getGetCategoryList } from '../../../features/categoryListSlice';

export const Task = (task) => {
    const selectedCategories = useSelector(getGetCategoryList);
    
    const iconSize = "xl";
    const dispatch = useDispatch();

    const taskId = task.id;
    // Edit task
    const [newTitle, setNewtitle] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState(20);
    const maxTitleSize = 20;

    const toggleEditMode = () => {
        setEditing(current => !current);
    }

    // Currently when a user edits a task, all field values have no value, I want a default value in place
    // This will help if the user acidently clicks edit, it will also help if the user wants to add to the existing edit
    // Possible solution :
    // https://react-hook-form.com/get-started

    // Complete Task
    const completeTask = () => {
        dispatch(isComplete(task.id))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(editTask({
            id: taskId,
            title: newTitle,
            description: newDescription,
            category: parseInt(newCategory)
        }));
        setEditing(false)
    }
    
    const onTaskTitleChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setNewtitle(e.target.value);
    }

    const handleChange = (e) => {
        setNewCategory(e.target.value);
    }

    return(
        <div className="task-item">
            {isEditing === false ? 
            <>
            <div className="task-top-row">
                <div className="task-top-left-icons">
                    {/* View button */}
                    <button className="icon-button icon-margin-right" onClick={() => dispatch(showDescription(task.id))}><FontAwesomeIcon icon={faMagnifyingGlass} size={iconSize}/></button>
                    {/* Edit button */}
                    <button className="icon-button tooltip" onClick={toggleEditMode}><FontAwesomeIcon icon={faPenToSquare} size={iconSize}/></button>
                </div>
                {/* delete task button */}
                <button className="icon-button" onClick={() => dispatch(deleteTask(task.id))}><FontAwesomeIcon icon={faTrashCan} size={iconSize}/></button>         
            </div> 

            <div className='task-title-description-container'>
                <h3 className='task-title'>{task.title}</h3>
                {task.show === false ? "" : 
                <div className="task-hidden-contents-container">
                    <p className='task-description'>{task.description}</p>
                    {task.completed === true ? "" : <button type="button" onClick={completeTask} className='form-submit clickable'>Complete</button>}
                </div>
                }
            </div>
            </> : ""}
            {isEditing === true ? 
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="editTitle"
                        placeholder={task.title}
                        value={newTitle}
                        maxLength={maxTitleSize}
                        onChange={(e) => onTaskTitleChange(e)}
                    ></input> 
                    <p className="form-message">{newTitle.length > 0 ? "" : "Title Required"}</p>
                    <p className="form-message">Remaining characters: {characters}</p>

                    <div className="form-group">
                        <textarea
                            name="editDescription"
                            required={true}
                            data-testid='adding-task-form-input-description'
                            type="text"
                            placeholder={task.description}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <p className="form-message">{task.description.length > 0 ? "" : "Description Required"}</p>
                    </div>

                    {selectedCategories < 1 ? <p>Please create a category</p> :
                    <div>
                        <label>Select a category</label>
                        {selectedCategories.map((item) => {
                            return(
                                <div key={item.id} className="radio-row">
                                    <input required type="radio" value={item.id} name="editCategory" onChange={handleChange} className="category-button" /><p>{item.title}</p>
                                </div>)
                            })
                        }
                    </div>}


                    <button className="form-submit clickable" type="submit" value="Submit">Confirm</button>
                </form>
                : "" }

        </div>
    )
}
