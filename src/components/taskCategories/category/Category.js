import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory, editCategoryTitle } from '../../../features/categoryListSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


export const Category = (category) => {

    const [newTitle, setNewtitle] = useState("");
    const [isEditing, setEditing] = useState(false);

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
            title: newTitle
        }));
    }

    // when edit mode is true, a submit button appears 
    // the associated field becomes editable
    // clicking the submit button replaces the corrosponding data in the state

    const onCategoryChange = (e) => {
        setNewtitle(e.target.value);
    }

    return(
        <div className="column">
            <div className="category-title-container">
                {isEditing === true ? 
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder={category.title}
                        value={newTitle}
                        onChange={(e) => onCategoryChange(e)}
                    ></input> 
                    <button type="submit" value="Submit">Submit</button>
                </form>
                : <h2>{category.title}</h2> }
                
                <div>
                    <button className="icon-button" onClick={toggleEditMode}>
                        <FontAwesomeIcon icon={faPenToSquare} size={iconSize} className="category-icons"/>
                    </button>
                    <button className="icon-button" onClick={() => dispatch(deleteCategory(category.id))}>
                        <FontAwesomeIcon icon={faCircleMinus} size={iconSize} className="category-icons"/>
                    </button>
                </div> 
            </div>
            {/* map out tasks in this category */}
        </div>
    )
}
