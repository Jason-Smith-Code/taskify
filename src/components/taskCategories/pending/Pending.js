import { Task } from '../task/Task';
import { getTaskList } from '../../../features/taskListSlice';
import { useSelector } from "react-redux";

export const Pending = () => {
    const selectedTasks = useSelector(getTaskList);
    return (
        <div className="column full-height">
            <div className="category-title-container"><h2>Pending Tasks</h2></div>
            {selectedTasks.map(task => 
                <Task 
                    key={task.id}
                    title={task.title} 
                    id={task.id}
                    description={task.description}
                    show={task.show}
                />
            )}
        </div>
    )
}