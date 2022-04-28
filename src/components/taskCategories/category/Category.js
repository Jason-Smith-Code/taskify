import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { deleteCategory, editCategoryTitle } from '../../../features/categoryListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getTaskList } from '../../../features/taskListSlice';
import { Task } from '../task/Task';
import { deleteTask } from '../../../features/taskListSlice';

export const Category = (category) => {

    const dispatch = useDispatch();
    const originalTaskList = useSelector(getTaskList);
    const iconSize = "xl";
    const categoryId = category.id;

    // filter category list to only show items that have a category by name
    function filterCategoryList() {
       const newList = originalTaskList.filter(task => task.category === category.title);
        
       return newList.map(task => 
        <Task 
            key={task.id}
            title={task.title} 
            id={task.id}
            description={task.description}
            show={task.show}
            completed={task.completed}
            category={task.category}
        />)
    }

    const [newTitle, setNewtitle] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState(20);
    const maxTitleSize = 20;

    // clicking the edit button toggles edit mode
    const toggleEditMode = () => {
        setEditing(current => !current);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(editCategoryTitle({
            id: categoryId,
            title: newTitle,
        }));
        setEditing(false)
    }

    const onCategoryChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setNewtitle(e.target.value);
    }

    const deletingCategory = () => {
        deleteAllCategoryTasks()
        dispatch(deleteCategory(category.id))
        refreshPage()
    }

    const deleteAllCategoryTasks = () => {
        // identfy all tasks in category
        const itemsToBeDeleted = originalTaskList.filter(task => task.category === category.title);
        console.log(`items to be deleted ${itemsToBeDeleted}`)
        // loop through each one dispatching delete task as we go
        for (let i = 0; i < itemsToBeDeleted.length; i++ ) {
            dispatch(deleteTask(itemsToBeDeleted[i].id));
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        <div className="column">
            <div className="category-title-container">
                {isEditing === false ? 
                    <div className="category-icon-contanier">
                        <button className="icon-button" onClick={toggleEditMode}>
                            <FontAwesomeIcon icon={faPenToSquare} size={iconSize} className="category-icons"/>
                        </button>
                        <button className="icon-button" onClick={deletingCategory}>
                            <FontAwesomeIcon icon={faTrashCan} size={iconSize} className="category-icons"/>
                        </button>
                    </div> :""
                }
                {isEditing === true ? 
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder={category.title}
                        value={newTitle}
                        maxLength={maxTitleSize}
                        onChange={(e) => onCategoryChange(e)}
                    ></input> 
                    <p className="form-message">{newTitle.length > 0 ? "" : "Title Required"}</p>
                    <p className="form-message">Remaining characters: {characters}</p>
                    <button className="form-submit" type="submit" value="Submit">Confirm</button>
                </form>
                : <h2>{category.title}</h2> }
            </div>
            {/* map out tasks in this category */}
            {filterCategoryList()}
        </div>
    )
}