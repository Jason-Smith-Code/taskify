import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Task.css';
import { deleteTask, showDescription, isComplete } from '../../../features/taskListSlice';
import { useDispatch } from 'react-redux';

export const Task = (task) => {

    const iconSize = "xl";
    const dispatch = useDispatch();

    // Edit task

    // Complete Task
    const completeTask = () => {
        dispatch(isComplete(task.id))
    }


    return(
        <div className="task-item">
            <div className="task-row-edit-delete">
                {/* Edit button */}
                <button className="icon-button" onClick={() => dispatch(showDescription(task.id))}><FontAwesomeIcon icon={faMagnifyingGlass} size={iconSize}/></button>
                {/* delete task button */}
                <button className="icon-button" onClick={() => dispatch(deleteTask(task.id))}><FontAwesomeIcon icon={faTrashCan} size={iconSize}/></button>         
            </div>
            <div className='task-title-description-container'>
                <h3 className='task-title'>{task.title}</h3>
                {task.show === false ? "" : 
                <div>
                    <p className='task-description'>{task.description}</p>
                    {task.completed === true ? "" : <button type="button" onClick={completeTask} className='form-submit'>Complete</button>}
                </div>
                }
            </div>
        </div>
    )
}
