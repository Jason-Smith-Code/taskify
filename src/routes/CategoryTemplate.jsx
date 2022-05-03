import { TaskForm } from "../components/forms/TaskForm";
import { getTaskList } from "../features/taskListSlice";
import { useSelector } from "react-redux";
import './CategoryTemplates.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CategoryTemplate(category) {
    const taskList = useSelector(getTaskList);
    const iconSize = "xl";

    function filterCategoryList() {
        const newList = taskList.filter(task => task.category === category.id);
         
        return newList.map(task => 
            <div key={task.id} className="task-strip">
             <div className="task-strip-title-container"><h3>{task.title}</h3></div>
             <div>
                {/* View button */}
                <button className="icon-button icon-margin-right">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={iconSize}/>
                </button>
                {/* Edit button */}
                <button className="icon-button icon-margin-right">
                    <FontAwesomeIcon icon={faPenToSquare} size={iconSize}/>
                </button>
                {/* delete task button */}
                <button className="icon-button" >
                    <FontAwesomeIcon icon={faTrashCan} size={iconSize}/>
                </button>
             </div>
            </div>
            )
    }

    return (
        <div id="main">
            <div id="forms-column" className="column">
                <TaskForm />  
            </div>
            <div className="task-container"> 
                <h2 className="category-title-container fit-content">Category: {category.title}</h2>
                {filterCategoryList()}
            </div>
        </div>
      );
}