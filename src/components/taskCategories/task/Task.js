import { faArrowsUpDownLeftRight, faCircleMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';

export const Task = (task) => {

    const iconSize = "lg";

    return(
        <div className="task-item">
            <div className="task-row-title">
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
        
            <div className='task-description-container'>
                <p>{task.description}</p>
            </div>
        </div>
    )
}
