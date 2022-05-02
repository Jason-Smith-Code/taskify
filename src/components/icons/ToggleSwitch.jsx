import  './Icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const ToggleSwitch = () => {
    const size = "2xs"
    const [darkMode, setDarkmode] = useState(false);

    const toggleDarkMode = () => {
        setDarkmode(!darkMode)
        console.log(darkMode)
    }

    // change the background colour
    // .App {background: linear-gradient(125deg, rgb(194 165 188) 0%, rgba(193,233,241,1) 100%)}
    if (darkMode === true) {
        document.documentElement.style.setProperty("--Color1", '#2b043e');
        document.documentElement.style.setProperty("--Color2", '#ffffff');
        document.documentElement.style.setProperty("--Color3", '#ffffff');
        document.documentElement.style.setProperty("--Background1", '#9E0091');
        document.documentElement.style.setProperty("--Background2", '#110044');
    } else {
        document.documentElement.style.setProperty("--Color1", '#ffffff');
        document.documentElement.style.setProperty("--Color2", '#69009e');
        document.documentElement.style.setProperty("--Color3", '#9E0091');
        document.documentElement.style.setProperty("--Background1", '#C2A5BC');
        document.documentElement.style.setProperty("--Background2", '#C1E9F1');
    }

    return (
        <div className='spacing-right'>
            <label className="switch">
                <input 
                    type="checkbox"
                    name="lightDarkToggle"
                    id="lightDarkToggle" 
                    onClick={toggleDarkMode}>

                </input>
                <span className="slider round">
                    <FontAwesomeIcon icon={faSun} size={size} />
                    <FontAwesomeIcon icon={faMoon} size={size} />
                </span>
            </label>
        </div>
    )
}