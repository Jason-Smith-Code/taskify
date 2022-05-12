import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { MenuContainer } from "../../menu/MenuContainer";
import { ToggleSwitch } from "../../icons/ToggleSwitch";
import { Link } from "react-router-dom";
import React from "react";

export function Header() {
    return (
        <div id="header">
            <Link role="link" to="/taskify" exact path="/taskify">
                <div id="logo-container">
                    <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                    <p id="logo-text">Taskify</p>
                </div>
            </Link>
            <div id="login-register-menu-container">
                <ToggleSwitch />
                <MenuContainer />
            </div>
        </div>
    );
}
