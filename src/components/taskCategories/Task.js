import { faArrowsUpDownLeftRight, faCircleMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Task = (task) => {

    const iconSize = "lg";

    return(
        <div className="task-item" id={task.key}>
            <p>{task.title}</p>
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
