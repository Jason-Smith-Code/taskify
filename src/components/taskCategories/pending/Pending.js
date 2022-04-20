import './Pending.css';
import { TaskList } from '../TaskList';
import { faArrowsUpDownLeftRight, faCircleMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Pending = () => {

    function printTasks(task) {

        const iconSize = "lg";

        return(
            <div className="task-item">
                <p>{task}</p>
                <div>
                    {/* Edit button */}
                    <FontAwesomeIcon icon={faPenToSquare} size={iconSize} className="task-item-icon"/>
                    {/* Move task button */}
                    <FontAwesomeIcon icon={faArrowsUpDownLeftRight} size={iconSize} className="task-item-icon"/>
                    {/* delete task button */}
                    <FontAwesomeIcon icon={faCircleMinus} size={iconSize} className="task-item-icon"/>
                </div>
            </div>
        )
    }

    return (
        <div className="column category-column pending-column">
            <h2>Pending tasks</h2>
            {/* Map through tasks here */}
            {TaskList.map(printTasks)}

        </div>
    )
}