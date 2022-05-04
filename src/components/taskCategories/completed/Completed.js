import { Task } from "../task/Task";
import { useSelector } from "react-redux";
import { getTaskList } from "../../../features/taskListSlice";

export const Completed = () => {
    const originalTaskList = useSelector(getTaskList);
    const newList = originalTaskList.filter(task => task.category === "complete");
    
    function filterCategoryList() {
        return newList.map(task => 
         <Task 
             key={task.id}
             title={task.title} 
             id={task.id}
             description={task.description}
             show={task.show}
             completed={task.completed}
         />)
    }

    return (
        <div className="column full-height">
            <div className="category-title-container"><h2>Completed Tasks ( {newList.length} )</h2></div>
            <div className="tasks-container">
                {filterCategoryList()}
            </div>
        </div>
    )
}