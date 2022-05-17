import  './Icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export const ToggleSwitch = () => {
    const size = "2xs"
    const [theme, setTheme] = useState("light");
    
    const toggleTheme = () => { 
        if(theme === "dark"){
            setTheme("light")
        } else {
            setTheme("dark")
        } 
    }

    if (theme === "dark") {
        console.log("applying dark theme")
        document.documentElement.style.setProperty("--Color1Light", '#2b043e');
        document.documentElement.style.setProperty("--Color2Light", '#ffffff');
        document.documentElement.style.setProperty("--Color3Light", '#ffffff');
        document.documentElement.style.setProperty("--Background1Light", '#9E0091');
        document.documentElement.style.setProperty("--Background2Light", '#110044');
        console.log("dark theme applied")
    } else {
        console.log("applying light theme")
        document.documentElement.style.setProperty("--Color1Light", '#ffffff');
        document.documentElement.style.setProperty("--Color2Light", '#69009e');
        document.documentElement.style.setProperty("--Color3Light", '#9E0091');
        document.documentElement.style.setProperty("--Background1Light", '#C2A5BC');
        document.documentElement.style.setProperty("--Background2Light", '#C1E9F1');
        console.log("light theme applied")
    } 

    return (
        <div className='spacing-right'>
            <label data-testid='theme-toggle' className="switch" id="theme-toggle">
                <input
                    data-testid='light-dark-switch'
                    type="checkbox"
                    name="lightDarkToggle"
                    id="lightDarkToggle" 
                    onClick={toggleTheme}>
                </input>
                <span className="slider round">
                    <FontAwesomeIcon icon={faSun} size={size} />
                    <FontAwesomeIcon icon={faMoon} size={size} />
                </span>
            </label>
        </div>
    )
}