import { faArrowsUpDownLeftRight, faCircleMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';
import { deleteTask } from '../../../features/taskListSlice';
import { useDispatch } from 'react-redux';

export const Task = (task) => {

    const iconSize = "xl";
    const dispatch = useDispatch();

    return(
        <div className="task-item">
            <div className="task-row-edit-delete">
                {/* Edit button */}
                <button className="icon-button"><FontAwesomeIcon icon={faPenToSquare} size={iconSize}/></button>
                {/* delete task button */}
                <button className="icon-button" onClick={() => dispatch(deleteTask(task.id))}><FontAwesomeIcon icon={faCircleMinus} size={iconSize}/></button>            
            </div>
            <div className='task-title-description-container'>
                <h3 className='task-title'>{task.title}</h3>
                <p>{task.description}</p>            
            </div>
            {/* Move task button */}
            <div className='move-button-container'>
                <button className="icon-button"><FontAwesomeIcon icon={faArrowsUpDownLeftRight} size={iconSize}/></button>
            </div>
        </div>
    )
}
