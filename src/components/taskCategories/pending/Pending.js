import { Task } from '../task/Task';
import { TaskList } from '../lists/TaskList';

export const Pending = () => {

    return (
        <div className="column full-height">
            <h2>Pending tasks</h2>
            {TaskList.map(task => <Task title={task.title} key={task.key} description={task.description}/>)}
        </div>
    )
}