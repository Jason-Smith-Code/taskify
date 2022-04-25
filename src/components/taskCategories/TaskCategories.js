import { Pending } from "./pending/Pending";
import './TaskCategories.css';
import { Category } from "./category/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
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
                    key={category.key} 
                />)}
                <div className='column center'>
                    <button id="addCategoryButton">Add category <FontAwesomeIcon icon={faCirclePlus} /></button>
                    <CategoryForm />
                </div>
                
            </div>
    )
}