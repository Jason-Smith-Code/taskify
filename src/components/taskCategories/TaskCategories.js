import { Pending } from "./pending/Pending";
import { CategoryList } from '../taskCategories/lists/CategoryList';
import './TaskCategories.css';
import { Category } from "./category/Category";

export const TaskCategories = () => {

    return (
            <div id="category-container">
                <Pending />
                {CategoryList.map(category => <Category title={category.title} key={category.key} />)}
            </div>
    )
}