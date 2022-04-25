import { Pending } from "./pending/Pending";
import './TaskCategories.css';
import { Category } from "./category/Category";
import { CategoryForm } from "../forms/CategoryForm";
import { getGetCategoryList } from "../../features/categoryListSlice";
import { useSelector } from "react-redux";

export const TaskCategories = () => {

    const selectedCategories = useSelector(getGetCategoryList);

    return (
            <div id="category-container">
                <Pending />
                {selectedCategories.map(category => 
                <Category 
                    title={category.title} 
                    key={category.id} 
                    id={category.id}
                />)}
                <div className='column center'>
                    <CategoryForm />
                </div>
            </div>
    )
}