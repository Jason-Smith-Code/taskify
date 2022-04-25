import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory } from '../../../features/categoryListSlice';
import { useDispatch } from 'react-redux';

export const Category = (category) => {

    const dispatch = useDispatch();
    const iconSize = "xl";
    return(
        <div className="column">
            <div className="category-title-container">
                <h2>{category.title}</h2>
                <div>
                    <button className="icon-button"><FontAwesomeIcon icon={faPenToSquare} size={iconSize} className="category-icons"/></button>
                    <button className="icon-button" onClick={() => dispatch(deleteCategory(category.id))}><FontAwesomeIcon icon={faCircleMinus} size={iconSize} className="category-icons"/></button>
                </div> 
            </div>
            {/* map out tasks in this category */}
        </div>
    )
}
