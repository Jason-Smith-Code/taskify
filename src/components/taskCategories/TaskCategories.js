import { Pending } from "./pending/Pending";
import { CategoryList } from '../taskCategories/lists/CategoryList';
import './TaskCategories.css';
import { Category } from "./category/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export const TaskCategories = () => {

    return (
            <div id="category-container">
                <Pending />
                {CategoryList.map(category => <Category title={category.title} key={category.key} />)}
                <div className='column center'>
                    <button id="addCategoryButton">Add Task <FontAwesomeIcon icon={faCirclePlus} /></button>
                </div>
            </div>
    )
}