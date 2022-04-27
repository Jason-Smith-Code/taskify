import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory, editCategoryTitle } from '../../../features/categoryListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getTaskList } from '../../../features/taskListSlice';
import { Task } from '../task/Task';

export const Category = (category) => {

    const originalTaskList = useSelector(getTaskList)

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
        />)
    }

    const [newTitle, setNewtitle] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [characters, setCharacters] = useState(20);
    const maxTitleSize = 20;

    const dispatch = useDispatch();
    const iconSize = "xl";
    const categoryId = category.id;

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

    // when edit mode is true, a submit button appears 
    // the associated field becomes editable
    // clicking the submit button replaces the corrosponding data in the state

    const onCategoryChange = (e) => {
        let size = e.target.value.length;
        setCharacters(maxTitleSize - size)
        setNewtitle(e.target.value);
    }

    const deletingCategory = () => {
        dispatch(deleteCategory(category.id))
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
                            <FontAwesomeIcon icon={faCircleMinus} size={iconSize} className="category-icons"/>
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