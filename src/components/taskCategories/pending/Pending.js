import { Task } from '../Task';
import { TaskList } from '../TaskList';

export const Pending = () => {

    return (
        <div className="column category-column pending-column">
            <h2>Pending tasks</h2>
            {TaskList.map(task => <Task title={task.title} key={task.key} description={task.description}/>)}
        </div>
    )
}