import { faArrowsUpDownLeftRight, faCircleMinus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';
import { deleteTask } from '../../../features/taskListSlice';
import { useDispatch } from 'react-redux';

export const Task = (task) => {

    const iconSize = "lg";
    const dispatch = useDispatch();

    return(
        <div className="task-item">
            <div className="task-row-edit-delete">
                {/* Edit button */}
                <FontAwesomeIcon icon={faPenToSquare} size={iconSize}/>
                {/* delete task button */}
                <a className="icon-button" onClick={() => dispatch(deleteTask(task.id))}><FontAwesomeIcon icon={faCircleMinus} size={iconSize}/></a>            
            </div>
            <div className='task-title-description-container'>
                <h3 className='task-title'>{task.title}</h3>
                <p>{task.description}</p>            
            </div>
            {/* Move task button */}
            <div className='move-button-container'>
                <FontAwesomeIcon icon={faArrowsUpDownLeftRight} size={iconSize}/>
            </div>
        </div>
    )
}
