import "./Menu.css";
import { Link } from "react-router-dom";
import { getCategoryList } from "../../features/categoryListSlice";
import { useSelector } from "react-redux";
import { RemoveSpaces } from "../../utilities/RemoveSpaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const Menu = () => {
    const selectedCategories = useSelector(getCategoryList);

    function closeMenu() {
        const menu = document.getElementById("menu");
        menu.classList.remove("visible-menu");
        menu.classList.add("hidden-menu");
    }

    function printCategoryLinks() {
        return selectedCategories.map((category) => (
            <Link
                key={category.id}
                title={category.title}
                className="menu-link"
                to={`/${RemoveSpaces(category.title)}`}
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
        <div id="menu" className="hidden-menu">
            <div id="close-menu-container">
                <button
                    id="close-menu-button"
                    onClick={closeMenu}
                    type="button"
                >
                    Close menu
                </button>
            </div>
            <Link className="menu-link" to="/">
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faCircleCheck}
                />
                Taskify
            </Link>
            <Link className="menu-link" to="/guide">
                <FontAwesomeIcon
                    className="icon-margin-right"
                    icon={faCircleInfo}
                />
                Guide
            </Link>
            <p className="menu-heading">Categories</p>
            {printCategoryLinks()}
        </div>
    );
};
