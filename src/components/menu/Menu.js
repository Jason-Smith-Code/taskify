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
                onClick={closeMenu}
                key={category.id}
                title={category.title}
                id={category.id}
                className="menu-link"
                exact
                path={`/category/${RemoveSpaces(category.title)}`}
                to={`/category/${RemoveSpaces(category.title)}`}
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
                to="/"
                exact
                path="/"
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
                to="/guide"
                exact
                path="/guide"
            >
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
