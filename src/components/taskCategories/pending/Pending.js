import { Task } from '../task/Task';
import { getTaskList } from '../../../features/taskListSlice';
import { useSelector } from "react-redux";

export const Pending = () => {
    const selectedTasks = useSelector(getTaskList);
    console.log(selectedTasks)

    return (
        <div className="column full-height">
            <h2>Pending tasks</h2>
            {selectedTasks.map(task => <Task title={task.title} key={task.key} description={task.description}/>)}
        </div>
    )
}