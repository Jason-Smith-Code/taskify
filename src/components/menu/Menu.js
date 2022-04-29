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
                <button onClick={closeMenu} type="button">Close menu</button>
            </div>
            {/* List out menu items */}
            <p className="menu-item">Icon Guide</p>
            <p className="menu-item">Tutorial</p>
        </div>
    )
}