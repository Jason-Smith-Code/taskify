import "./Menu.css";
import { Link } from "react-router-dom";
import { getCategoryList } from "../../features/categoryListSlice";
import { useSelector } from "react-redux";
import { RemoveSpaces } from "../../utilities/RemoveSpaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const Menu = () => {
    const selectedCategories = useSelector(getCategoryList);

    function closeMenu() {
        const menu = document.getElementById("menu");
        menu.classList.remove("visible-menu");
        menu.classList.add("hidden-menu");
    }

    function deleteStorage() {
        localStorage.clear();
        window.location.reload();
    }

    function confirmDelete() {
        const message = "are you sure you want to delete all data";
        if (window.confirm(message) === true) {
            deleteStorage();
        } else {
            return;
        }
    }

    function printCategoryLinks() {
        return selectedCategories.map((category) => (
            <Link
                onClick={closeMenu}
                key={category.id}
                title={category.title}
                id={category.id}
                className="menu-link"
                path={`/taskify/category/${RemoveSpaces(category.title)}`}
                to={`/taskify/category/${RemoveSpaces(category.title)}`}
            >
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faFolder}
                />
                {category.title}
            </Link>
        ));
    }

    return (
        <div id="menu" data-testid="hidden-menu" className="hidden-menu">
            <div id="close-menu-container">
                <button
                    id="close-menu-button"
                    onClick={closeMenu}
                    type="button"
                >
                    Close menu
                </button>
            </div>
            <Link
                onClick={closeMenu}
                role="link-to-main-page"
                className="menu-link"
                to="/taskify"
                path="/taskify"
            >
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faCircleCheck}
                />
                Taskify
            </Link>
            <Link
                onClick={closeMenu}
                role="link-to-guide-page"
                className="menu-link"
                to="/taskify/guide"
                path="/taskify/guide"
            >
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faCircleInfo}
                />
                Guide
            </Link>
            <button onClick={confirmDelete} className="delete-data">
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faExclamationCircle}
                />
                Clear all data
            </button>
            <p className="menu-heading">Categories</p>
            {printCategoryLinks()}
        </div>
    );
};
