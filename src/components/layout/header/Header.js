import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    return(
        <div id="header">
            <div id="logo-container">
                <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                <p id="logo-text">Taskify</p>
            </div>
            <div id="login-register-menu-container">
                    <p className="spacing-right">Login / Register</p>
                <div className="menu-container">
                    <FontAwesomeIcon icon={faBars} size="lg" />
                    <p className="top-menu-text">Menu</p>
                </div>
            </div>
        </div>
    )
}