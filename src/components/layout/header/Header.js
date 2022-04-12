import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function Header() {
    return(
        <div id="header">
            <div id="logo-container">
                <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                <p id="logo-text">TASKIFY</p>
            </div>
            {/* Menu */}
            <p>MENU</p>
        </div>
    )
}