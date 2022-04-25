import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


export const Category = (category) => {
    const iconSize = "lg";
    return(
        <div className="column">
            <div className="category-title-container"><h2>{category.title}</h2><FontAwesomeIcon icon={faPenToSquare} size={iconSize}/></div>
            {/* map out tasks in this category */}
        </div>
    )
}
