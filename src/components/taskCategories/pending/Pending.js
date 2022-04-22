import { Task } from '../task/Task';
import { getTaskList } from '../../../features/taskListSlice';
import { useSelector } from "react-redux";

export const Pending = () => {
    const selectedTasks = useSelector(getTaskList);
    return (
        <div className="column full-height">
            <h2>Pending tasks</h2>
            {selectedTasks.map(task => 
            <div>
                <Task 
                    title={task.title} 
                    id={task.key} 
                    description={task.description}
                    show={task.show}
                />
            </div>
            
            )}
        </div>
    )
}