import "./Guide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCircleInfo,
    faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    faTrashCan,
    faPenToSquare,
    faFolder,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import React from "react";
// Import images
import addCategoryFormImage from "../assets/images/add-category-form.jpg";
import deleteCategory from "../assets/images/delete-category.jpg";
import editCategory from "../assets/images/edit-category.jpg";
import addTaskFormImage from "../assets/images/add-task-form.jpg";
import deleteTask from "../assets/images/delete-task.jpg";
import editTask from "../assets/images/edit-task.jpg";
import viewTask from "../assets/images/view-task.jpg";
import completed from "../assets/images/completed.jpg";
import mainLight from "../assets/images/main-light.jpg";
import MainDark from "../assets/images/main-dark.jpg";
import mainCategory from "../assets/images/category.jpg";

export const Guide = () => {
    const iconSize = "2xl";

    return (
        <div className="centered">
            <div className="text-container">
                <div className="text-group">
                    <h1 className="guide-title">Guide</h1>
                    <p>
                        You can find all the information you need on how to use
                        this application right here.
                    </p>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Icons</h2>
                    <p>
                        Here is a list of all the icons you will encounter
                        whilst using this application accompanied by their
                        actions when clicked.
                    </p>
                    <div id="icon-guide-container">
                        <div className="icon-column">
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faMagnifyingGlass}
                                size={iconSize}
                            />
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faTrashCan}
                                size={iconSize}
                            />
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faPenToSquare}
                                size={iconSize}
                            />
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faCircleInfo}
                                size={iconSize}
                            />
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faFolder}
                                size={iconSize}
                            />
                            <FontAwesomeIcon
                                className="icon-guide-padding"
                                icon={faExclamationCircle}
                                size={iconSize}
                            />
                        </div>
                        <div className="icon-description-column">
                            <p>View</p>
                            <p>Delete</p>
                            <p>Edit</p>
                            <p>Information</p>
                            <p>Category page</p>
                            <p>Clear Data</p>
                        </div>
                    </div>
                </div>
                <div className="text-group">
                    <h2 data-testid="title-element" className="guide-title">
                        Adding a Category
                    </h2>
                    <p>
                        When using this application for the first time, the only
                        element on the screen should be the "add category" form,
                        as a category is required before adding a task. Think of
                        a category as the name of group for your tasks.
                        <br /> examples: "Work", "Home", or "Garden" <br /> Give
                        your category a title, if you change your mind on the
                        title, don't worry you can alter it. To add a cateogry
                        simply fill the "add category" form and click the "add
                        category" button.
                        <br />
                        <Link to="/" path="/">
                            Can be found on this page
                        </Link>
                        .
                    </p>

                    <img
                        className="guide-image"
                        src={addCategoryFormImage}
                        alt="add category form"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Deleting a Category</h2>
                    <p>
                        If you have no use for a category its possible to delete
                        it, but beware, deleting a category that contains tasks,
                        will also delete the tasks. Click the bin icon to delete
                        the corrosponding category.
                    </p>
                    <img
                        className="guide-image"
                        src={deleteCategory}
                        alt="delete category"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Editing a Category</h2>
                    <p>
                        If you change your mind on a category name, you can
                        easily change it by clicking the pencil icon on the top
                        left of the image below. You will be asked to re-enter
                        the title, then click the "confirm" button to change the
                        name.
                    </p>
                    <img
                        className="guide-image"
                        src={editCategory}
                        alt="edit category form"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Adding a task</h2>
                    <p>
                        Before adding a task, you must have created a category,
                        after creating a category, the add task form will be
                        available. You are required to enter a task title, a
                        task description, and select a task category. Once these
                        fields have been filled in, press the "add task" button
                        to submit the task to the corrosponding category.
                    </p>
                    <img
                        className="guide-image"
                        src={addTaskFormImage}
                        alt="add task form"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Deleting a task</h2>
                    <p>
                        After adding a task, at some stage you may wish to
                        remove it for any reason. This can be done by clicking
                        the bin icon on the task you wish to delete.
                    </p>
                    <img
                        className="guide-image"
                        src={deleteTask}
                        alt="delete task"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Editing a task</h2>
                    <p>
                        To edit a task, locate the task you wish to change and
                        click the pencil icon.
                    </p>
                    <img
                        className="guide-image"
                        src={deleteTask}
                        alt="edit task"
                    ></img>
                    <p>
                        Editing a task allows you to change its title,
                        description or associated category. Click the confirm
                        button to submit your changes.
                    </p>
                    <img
                        className="guide-image"
                        src={editTask}
                        alt="edit task form"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Viewing a task</h2>
                    <p>
                        By default, added tasks only show the task title, this
                        is to make effect use of space. To view a task just
                        click the "magnifying glass" icon. When viewing a task
                        you will see the associated task description and also a
                        "complete" button.
                    </p>
                    <img
                        className="guide-image"
                        src={viewTask}
                        alt="view task"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Completing a task</h2>
                    <p>
                        You can mark a task as complete by clicking the
                        "complete" button. If you are unable to see the
                        "complete button", make sure you have clicked the view
                        icon on the task you intend on completing.
                    </p>
                    <img
                        className="guide-image"
                        src={viewTask}
                        alt="view task"
                    ></img>
                    <p>
                        Once the task is marked as complete, the task will move
                        to the bottom of the category list, and will have a less
                        noticable appearance. It's possible to un-complete the
                        task too.
                    </p>
                    <img
                        className="guide-image"
                        src={completed}
                        alt="view task"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Light and Dark Mode</h2>
                    <p>
                        It's possible to switch the theme to a dark mode by
                        clicking the toggle button at the top of the page.
                    </p>
                    <img
                        className="guide-image full-width"
                        src={mainLight}
                        alt="Main View"
                    ></img>
                    <img
                        className="guide-image full-width"
                        src={MainDark}
                        alt="Main View"
                    ></img>
                </div>
                <div className="text-group">
                    <h2 className="guide-title">Views</h2>
                    <p>
                        The main page of Taskify contains all your categories
                        and tasks. Once you create a category, it also creates a
                        new page on Taskify, the new page can be found as a link
                        in the menu under "categories", here is a simplified
                        interface where you view tasks that particular category,
                        much more useful for mobile devices to reduce scrolling.
                    </p>

                    <img
                        className="guide-image full-width"
                        src={mainLight}
                        alt="Main View"
                    ></img>
                    <p>Main View</p>
                    <img
                        className="guide-image full-width"
                        src={mainCategory}
                        alt="Main View"
                    ></img>
                    <p>Category View</p>
                </div>
            </div>
        </div>
    );
};
