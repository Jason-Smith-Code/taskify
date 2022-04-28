import { Task } from "../task/Task";
import { useSelector } from "react-redux";
import { getTaskList } from "../../../features/taskListSlice";

export const Completed = () => {
    const originalTaskList = useSelector(getTaskList);

    function getCompletedSize () {
        const newList = originalTaskList.filter(task => task.category === "complete");
        return newList.length
    }

    function filterCategoryList() {
        const newList = originalTaskList.filter(task => task.category === "complete");
        console.log(newList)
        return newList.map(task => 
         <Task 
             key={task.id}
             title={task.title} 
             id={task.id}
             description={task.description}
             show={task.show}
         />)
    }

    return (
        <div className="column full-height">
            <div className="category-title-container"><h2>Completed Tasks ( {getCompletedSize()} )</h2></div>
            {filterCategoryList()}
        </div>
    )
}