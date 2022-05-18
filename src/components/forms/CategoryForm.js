import React, { useState, useEffect } from "react";
import "./Forms.css";
import {
    addCategory,
    getCategoryTitleStrings,
} from "../../features/categoryListSlice";
import { useDispatch, useSelector } from "react-redux";
export function CategoryForm() {
    const maxTitleSize = 20;
    const [title, setTitle] = useState("");
    const [characters, setCharacters] = useState(maxTitleSize);
    const [titleMatch, setTitleMatch] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            addCategory({
                id: Date.now(),
                title: title,
            })
        );
        setCharacters(maxTitleSize);
        clearForm();
    };
    const catergoryStrings = useSelector(getCategoryTitleStrings);
    const clearForm = () => {
        setTitle("");
    };

    const onCategoryChange = (e) => {
        let size = e.target.value.length;
        // check match of existing category titles
        const exists = catergoryStrings.includes(e.target.value);
        if (exists === true) {
            setTitleMatch(true);
        } else {
            setTitleMatch(false);
        }
        setCharacters(maxTitleSize - size);
        setTitle(e.target.value.replace(/[^\w\s]/gi, ""));
    };

    // i need to fire off scroll to end when dispatch has been submitted from adding a category
    useEffect(() => {
        scrollToEnd();
    }, [title]);

    function scrollToEnd() {
        const element = document.getElementById("category-container");
        // console.log(`the element container is ${element}`);
        const elementWidth = element.scrollWidth;
        // console.log(`the element width is ${elementWidth}`);
        element.scrollLeft = elementWidth;
    }

    return (
        <form
            className="padded"
            id="category-form"
            data-testid="adding-category-form"
            onSubmit={handleSubmit}
        >
            <div className="form-header">
                <h2 data-testid="title-element">Add a Category</h2>
            </div>
            <input
                required={true}
                data-testid="adding-category-form-input-title"
                placeholder="Enter category Title"
                type="text"
                value={title}
                maxLength={maxTitleSize}
                onChange={(e) => onCategoryChange(e)}
            />
            {title.length > 0 ? (
                ""
            ) : (
                <p
                    className="form-message"
                    data-testid="category-title-required"
                >
                    Title Required
                </p>
            )}
            {titleMatch ? (
                <p
                    className="form-message"
                    data-testid="category-title-matched"
                >
                    Another category exists with the same title
                </p>
            ) : (
                ""
            )}
            <p className="form-message">Remaining characters: {characters}</p>
            <p
                className="form-message"
                data-testid="category-form-character-cap"
            >
                {title.length === maxTitleSize ? "Character cap reached" : ""}
            </p>
            {/* Disable submit while both input field conditions are not met */}
            {(title.length > 0) & (titleMatch === false) ? (
                <button
                    data-testid="adding-task-submit"
                    className="form-submit"
                    type="submit"
                    value="Submit"
                >
                    Add Category
                </button>
            ) : (
                ""
            )}
        </form>
    );
}
