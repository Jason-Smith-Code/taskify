import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';
import { deleteTask, showDescription, isComplete, editTask } from '../../../features/taskListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getGetCategoryList } from '../../../features/categoryListSlice';

import { useForm } from 'react-hook-form';

export const Task = (task) => {
    const selectedCategories = useSelector(getGetCategoryList);
    const maxTitleSize = 40;
    const iconSize = "xl";
    const dispatch = useDispatch();

    const taskId = task.id;
    // Edit task
    const [newTitle, setNewtitle] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState(maxTitleSize);

    const preloadedValues = {
        Title: task.title,
        Description: task.description
    }

    const {register} = useForm({
        defaultValues: preloadedValues
    })
    const toggleEditMode = () => {
        setEditing(current => !current);
        const oldTitle = task.title;   

    }

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
                    <button className="icon-button" onClick={toggleEditMode}><FontAwesomeIcon icon={faPenToSquare} size={iconSize}/></button>
                </div>
                {/* delete task button */}
                <button className="icon-button" onClick={() => dispatch(deleteTask(task.id))}><FontAwesomeIcon icon={faTrashCan} size={iconSize}/></button>         
            </div> 

            <div className='task-title-description-container'>
                <h3 className='task-title'>{task.title}</h3>
                {task.show === false ? "" : 
                <div className="task-hidden-contents-container">
                    <p className='task-description'>{task.description}</p>
                    {task.completed === true ? "" : <button type="button" onClick={completeTask} className='form-submit'>Complete</button>}
                </div>
                }
            </div>
            </> : ""}
            {isEditing === true ? 
                <form onSubmit={handleSubmit}>
                    <input 
                        {...register('Title')}
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
                            {...register('Description')}
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
                        <div className="options-container"></div>
                        {selectedCategories.map((item) => {
                            return(
                                <div key={item.id} className="radio-row">
                                    <input required type="radio" value={item.id} name="editCategory" onChange={handleChange} className="category-button" /><p>{item.title}</p>
                                </div>)
                            })
                        }
                        
                    </div>}
                    
                    <button className="form-submit" type="submit" value="Submit">Confirm</button>
                </form>
                : "" }

        </div>
    )
}
