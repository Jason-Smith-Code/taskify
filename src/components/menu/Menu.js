import './Menu.css';
import { Link } from "react-router-dom";
import { getGetCategoryList } from "../../features/categoryListSlice";
import { useSelector } from "react-redux";
import { RemoveSpaces } from '../../utilities/RemoveSpaces'

export const Menu = () => {
    const selectedCategories = useSelector(getGetCategoryList);

    function closeMenu() {
        const menu = document.getElementById("menu"); 
        menu.classList.remove("visible-menu");
        menu.classList.add("hidden-menu");
    }

    function printCategoryLinks() {
        return (
            selectedCategories.map(category => 
                <Link 
                    key={category.id} 
                    title={category.title} 
                    to={`/${RemoveSpaces(category.title)}`}>{category.title}</Link>
        )
        )
    }

    return (
        <div id="menu" className='hidden-menu'>
            <div id="close-menu-container">
                <button id="close-menu-button" onClick={closeMenu} type="button">Close menu</button>
            </div>
            <p>Categories</p>
            {printCategoryLinks()}
            <p>Other</p>
            <Link to="/">Main</Link>
            <Link to="/print">Print Tasks</Link>
            <Link to="/register">Register</Link>
            <Link to="/icon-guide">Icon Guide</Link>
            <Link to="/tutorial">Tutorial</Link>
            <Link to="/account">Account</Link>
        </div>
    )
}