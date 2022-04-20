import { Pending } from "./pending/Pending"
import './CategoryList';

// here we import ther category list, and map through it to render added categories.
// make sure to add a horizontal scroll for when a user adds more categories that the screen can hold. Set categories at a fixed width
// allow users to change colour of category

export const TaskCategories = () => {

    return (
        <>  
            <Pending />
            <div className="column category-column column-1">
                <h2>Category 1 tasks</h2>
            </div>
            <div className="column category-column column-2">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column category-column column-3">
                <h2>Category 2 tasks</h2>
            </div>
            <div className="column completed-column">
                <h2>Completed tasks</h2>
            </div>
        </>
    )
}