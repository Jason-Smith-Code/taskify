import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { TaskForm } from "./TaskForm";

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
        const theTaskForm = document.getElementById("task-form");
        expect(theTaskForm).toBeNull();
    });

    test("Task Form renders with at least one category", () => {
        const initialState = {
            categories: {
                categoryList: [
                    {
                        title: "testCategory",
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

        // identify the task form
        const taskForm = screen.getByText("Add a Task");
        // expect the task form to be in the document
        expect(taskForm).toBeInTheDocument();
    });

    test("Filling in the form", () => {
        const onSubmitSpy = jest.fn();

        const initialState = {
            categories: {
                categoryList: [
                    {
                        title: "testCategory",
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
                    <TaskForm onSubmit={onSubmitSpy} />
                </Provider>
            </BrowserRouter>
        );

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

        // Category input container
        const optionsContainer = screen.getByTestId("options-container");
        expect(optionsContainer).toBeInTheDocument();

        // Category input options
        const testCategoryRadioOption = screen.getByRole(
            "radio",
            "testCategory"
        );
        expect(testCategoryRadioOption).toHaveAttribute("type", "radio");

        // Test successful Submit by filling in the form
        const inputTitle = "This is the task title";
        const inputDescription = "This is the task description";

        // change title
        fireEvent.click(titleInput);
        fireEvent.change(titleInput, {
            target: { value: inputTitle },
        });
        expect(titleInput).toHaveValue("This is the task title");
        // change description
        fireEvent.click(descriptionElement);
        fireEvent.change(descriptionElement, {
            target: { value: inputDescription },
        });
        expect(descriptionElement).toHaveValue("This is the task description");
        // select category
        fireEvent.click(testCategoryRadioOption);
        expect(testCategoryRadioOption).toBeChecked("testCategory");
        // click submit
        const taskSubmitButton = screen.getByRole("button", {
            name: /Add Task/i,
        });
        fireEvent.click(taskSubmitButton);

        const form = screen.getByTestId("adding-task-form");

        //  Check that the task has been added to a category
        // a console log in dispatch was not fired, so the form was not submitted

        // check to see that the form is empty
        fireEvent.click(taskSubmitButton);
        // try to fill the form in without a title or description

        const Emptystring = "";
        fireEvent.change(titleInput, {
            target: { value: Emptystring },
        });
        fireEvent.change(descriptionElement, {
            target: { value: Emptystring },
        });
        // check that submit button is not displayed when has nothing in its text fields
        //expect(taskSubmitButton).toBeNull();
    });
});
