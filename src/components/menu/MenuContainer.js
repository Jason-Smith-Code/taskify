import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const MenuContainer = () => {
    // toggle the css class of the menu element

    function openMenu() {
        const menu = document.getElementById("menu");
        menu.classList.remove("hidden-menu");
    }

    return (
        <div>
            <button type="button" onClick={openMenu} id="menu-button-container">
                <FontAwesomeIcon icon={faBars} size="lg" />
                <p className="top-menu-text">Menu</p>
            </button>
        </div>
    );
};
