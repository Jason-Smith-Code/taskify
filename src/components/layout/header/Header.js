import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { MenuContainer } from '../../menu/MenuContainer';
import { ToggleSwitch } from '../../icons/ToggleSwitch';

export function Header() {
    return(
        <div id="header">
            <div id="logo-container">
                <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                <p id="logo-text">Taskify</p>
            </div>          
            <div id="login-register-menu-container">
                <ToggleSwitch />
                    <p className="spacing-right">Login / Register</p>
                    <MenuContainer/>
            </div>
        </div>
    )
}