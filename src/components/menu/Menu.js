import './Menu.css';

export const Menu = () => {

    function closeMenu() {
        const menu = document.getElementById("menu"); 
        menu.classList.remove("visible-menu");
        menu.classList.add("hidden-menu");
    }

    return (
        <div id="menu" className='hidden-menu'>
            <div id="close-menu-container">
                <button id="close-menu-button" onClick={closeMenu} type="button">Close menu</button>
            </div>
            {/* List out menu items */}
            <p className="menu-item clickable">Maiin View</p>
            <p className="menu-item clickable">Add Task</p>
            <p className="menu-item clickable">Add Category</p>
            <p className="menu-item clickable">Register</p>
            <p className="menu-item clickable">Icon Guide</p>
            <p className="menu-item clickable">Tutorial</p>
            <p className="menu-item clickable">View account</p>
            <p className="menu-item clickable">Export Tasks to PDF</p>
        </div>
    )
}