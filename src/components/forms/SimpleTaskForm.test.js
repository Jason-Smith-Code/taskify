import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// https://jestjs.io/docs/expect

describe("<SimpleTaskForm />", () => {
    const mockStore = configureStore();
    let store;

    test("Task Form doesnt render with empty categories", () => {
        const initialState = {
            categories: {
                categoryList: [
                    {
                        title: "home",
                        id: "1",
                    },
                ],
            },
            tasks: {
                taskList: [],
            },
        };

        store = mockStore(initialState);
        // render the App
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        // click the menu link to visit the home category throught the menu
        // open the menu
        const menuButton = screen.getByText("Menu");
        fireEvent.click(menuButton);
        // find the home category
        const homeLink = screen.getByRole("link", { name: /home /i });
        fireEvent.click(homeLink);

        // identify the task form
        const simpleForm = screen.getByTestId("simple-adding-task-form");
        expect(simpleForm).toBeInTheDocument();

        // Title input
        const titleInput = screen.getByPlaceholderText("Enter Task Title");
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveAttribute("type", "text");

        // Description input
        const descriptionElement = screen.getByPlaceholderText(
            "Enter Task Description"
        );
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveAttribute("type", "text");

        // Test successful Submit by filling in the form
        const inputTitle = "This is the task title";
        const inputDescription = "This is the task description";

        // check the character cap is rendered when using a title with 40 characters
        fireEvent.click(titleInput);
        fireEvent.change(titleInput, {
            target: { value: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" },
        });
        expect(titleInput).toHaveValue(
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
        );
        const characterCapReached = screen.getByText("Character cap reached");
        expect(characterCapReached).toBeInTheDocument();

        // change title
        fireEvent.click(titleInput);
        fireEvent.change(titleInput, {
            target: { value: inputTitle },
        });
        expect(titleInput).toHaveValue("This is the task title");
        // since the new title is less thant he character cap we can expect that there is not warning on screen
        expect(characterCapReached).not.toBeInTheDocument();
        // change description
        fireEvent.click(descriptionElement);
        fireEvent.change(descriptionElement, {
            target: { value: inputDescription },
        });
        expect(descriptionElement).toHaveValue("This is the task description");

        // click submit
        const taskSubmitButton = screen.getByRole("button", {
            name: /Add Task/i,
        });
        fireEvent.click(taskSubmitButton);
    });
});
