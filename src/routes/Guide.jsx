import './Guide.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

export const Guide = () => {
    const addCategoryFormImage = require('../assets/images/add-category-form.jpg')
    const iconSize = "2xl"
    return (
        <div className='centered'>
            <div className='text-container'>
                <div className='text-group'>
                    <h1 className='guide-title'>Guide</h1>
                    <p>You can find all the information you need on how to use this application right here.</p>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Icons</h2>
                    <p>Here is a list of all the icons you will encounter whilst using this application accompanied by their actions when clicked.</p>
                    <div id="icon-guide-container">
                        <div className='icon-column'>
                            <FontAwesomeIcon className="icon-guide-padding" icon={faMagnifyingGlass} size={iconSize}/>
                            <FontAwesomeIcon className="icon-guide-padding" icon={faTrashCan} size={iconSize}/>
                            <FontAwesomeIcon className="icon-guide-padding" icon={faPenToSquare} size={iconSize}/>
                        </div>
                        <div className='icon-description-column'>
                            <p>View</p>
                            <p>Delete</p>
                            <p>Edit</p>
                        </div>
                    </div>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Adding a Category</h2>
                    <p>The first thing you must do is add a category, 
                        think of a category as the name of group for your tasks, examples:<br /> "Work", "Home", or "Garden" <br /> If you change your mind on the title, 
                        don't worry you can alter it. To add a cateogry simply fill the category form, it only needs a title. <Link to="/">Can be found here</Link>.
                    </p>
                    
                    <img className="guide-image" src={addCategoryFormImage} alt="add category form"></img>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Deleting a Category</h2>
                    <p>If you have no use for a category its possible to delete it, but beware, deleting a category that contains tasks, will also delete the tasks. </p>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Editing a Category</h2>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Adding a task</h2>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Deleting a task</h2>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Editing a task</h2>
                </div>
                <div className='text-group'>
                    <h2 className='guide-title'>Completing a task</h2>
                    <p>You can mark a task as complete by clicking the "complete" button pictured below. If you are unable to see the "complete button",
                        make sure you have clicked the view icon on the task you intend on completing.
                    </p>
                </div>
            </div>
        </div>
    )
}