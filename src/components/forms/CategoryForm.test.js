import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../app/App";

// https://jestjs.io/docs/expect

describe("<CategoryForm />", () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        const initialState = {
            categories: {
                categoryList: [
                    {
                        title: "existing title",
                        id: 1,
                    },
                ],
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
    });

    // expect the task form to not be in the document when no category exists
    test("Category form renders correctly", () => {
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
        const characterCapMessage = screen.getByText("Remaining characters: 0");
        expect(characterCapMessage).toBeInTheDocument();

        // identify the submit button
        const submitButton = screen.getByText("Add Category");
        expect(submitButton).toBeInTheDocument();

        // change the category title to ""
        fireEvent.change(titleInputElement, {
            target: { value: "" },
        });
        expect(titleInputElement).toHaveValue("");
        const zeroStringMessage = screen.getByTestId("category-title-required");
        expect(zeroStringMessage).toHaveTextContent("Title Required");

        // expect the submit button not to be on screen
        expect(submitButton).not.toBeInTheDocument();

        // check that the user can not submit a category which has a title that already exists
        fireEvent.change(titleInputElement, {
            target: { value: "existing title" },
        });
        const matchedTitle = screen.getByTestId("category-title-matched");
        expect(matchedTitle).toHaveTextContent(
            "Another category exists with the same title"
        );
        expect(matchedTitle).toBeInTheDocument();
    });
});
