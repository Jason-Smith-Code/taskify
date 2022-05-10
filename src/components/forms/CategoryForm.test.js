import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../app/App";

// https://jestjs.io/docs/expect

describe("<TaskForm />", () => {
    const mockStore = configureStore();
    let store;

    // expect the task form to not be in the document when no category exists
    test("Task Form doesnt render with empty categories", () => {
        const initialState = {
            categories: {
                categoryList: [],
            },
            tasks: {
                taskList: [],
            },
        };

        store = mockStore(initialState);
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        // identify the task form
        const theCategoryForm = document.getElementById("category-form");
        expect(theCategoryForm).toBeInTheDocument();

        // identify title input element
        const titleInputElement = screen.getByPlaceholderText(
            "Enter category Title"
        );
        expect(titleInputElement).toBeInTheDocument();

        // fill in the title input
        fireEvent.change(titleInputElement, {
            target: { value: "new Category" },
        });
        expect(titleInputElement).toHaveValue("new Category");

        // max title size is currently 20, check that is displays the correct figures on screen
        fireEvent.change(titleInputElement, {
            target: { value: "wwwwwwwwwwwwwwwwwwww" },
        });
        expect(titleInputElement).toHaveValue("wwwwwwwwwwwwwwwwwwww");

        // Identify character cap element
        const characterCapMessage = screen.getByTestId(
            "category-form-character-cap"
        );
        expect(characterCapMessage).toHaveTextContent("Character cap reached");

        // identify the submit button
        const submitButton = screen.getByText("Add Category");
        expect(submitButton).toBeInTheDocument();

        // change the category title to ""
        fireEvent.change(titleInputElement, {
            target: { value: "" },
        });
        expect(characterCapMessage).toHaveTextContent("");
        expect(titleInputElement).toHaveValue("");
        // expect the submit button to be null
        expect(submitButton).not.toBeInTheDocument();
    });
});
