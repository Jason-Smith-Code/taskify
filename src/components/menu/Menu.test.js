import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { testStore } from "../../app/createTestStore";

describe("<Menu />", () => {
    beforeEach(() => {
        cleanup;
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    });

    test("Menu alternates from hidden to revealed", () => {
        // the menu is not in the screen
        const menu = screen.getByTestId("hidden-menu");
        expect(menu).toHaveClass("hidden-menu");

        // user clicks open menu button
        const openMenuButton = screen.getByText("Menu");
        fireEvent.click(openMenuButton);
        expect(menu).not.toHaveClass("hidden-menu");

        // close menu
        const closeMenuButton = screen.getByText("Close menu");
        fireEvent.click(closeMenuButton);

        expect(menu).toHaveClass("hidden-menu");
    });

    test("Menu Contains Guide Link", () => {
        // expect menu to contain the following
        // link to guide page
        const guide = screen.getByText("Guide");
        expect(guide).toBeInTheDocument();
        expect(guide).toHaveAttribute("href", "/guide");
    });

    test("Menu Contains home page Link", () => {
        // link to taskify
        const taskifyLink = screen.getByRole("link", { name: /Taskify/i });
        expect(taskifyLink).toBeInTheDocument();
        expect(taskifyLink).toHaveAttribute("href", "/");
    });

    test("Menu Contains completed Tasks Button", () => {
        // to check this, I need to create a category, create a task for that category, mark that task as complete, then click the clear data button, and check the completed task no longer exists
        // ADDING A CATEGORY

        // identify category title input
        const addACategoryInput = screen.getByPlaceholderText(
            "Enter category Title"
        );
        // enter new category title in form
        fireEvent.change(addACategoryInput, {
            target: { value: "New Category" },
        });
        expect(addACategoryInput).toHaveValue("New Category");
        // identify submit button
        const addCategorySubmitButton = screen.getByRole("button", {
            name: /Add Category/i,
        });
        // click submit button
        fireEvent.click(addCategorySubmitButton);

        // expect the base state of the store (0 tasks in 1 category)
        const categoryTitle = screen.getByText("New Category ( 0 )");
        expect(categoryTitle).toBeInTheDocument();

        // ADDING A TASK

        // identify the task title input
        const titleInput = screen.getByPlaceholderText("Enter Task Title");
        // change the task title input
        fireEvent.change(titleInput, {
            target: { value: "New Task" },
        });
        // identfy the description
        const descriptionElement = screen.getByPlaceholderText(
            "Enter Task Description"
        );
        // change the description
        fireEvent.change(descriptionElement, {
            target: { value: "New Task description" },
        });
        // identify the radio input for category
        const testCategoryRadioOption = screen.getByRole(
            "radio",
            "New Category"
        );
        // select the radio input
        fireEvent.click(testCategoryRadioOption);
        // identify the submit task button
        const taskSubmitButton = screen.getByRole("button", {
            name: /Add Task/i,
        });
        expect(taskSubmitButton).toBeInTheDocument();
        // click the submit task button
        fireEvent.click(taskSubmitButton);
        // expect the new task to be in the document
        const newTask = screen.getByText("New Task");
        expect(newTask).toBeInTheDocument();
        // MARK TASK AS COMPLETE
        // inspect task button
        const inspectTaskButton = screen.getByTestId("task-item-inspect");
        fireEvent.click(inspectTaskButton);
        // complete button
        const completeButton = screen.getByText("Complete");
        fireEvent.click(completeButton);
        // identify clear data button
        const completeTasks = screen.getByRole("button", {
            name: /Delete all completed tasks/i,
        });
        expect(completeTasks).toBeInTheDocument();
        // click clear data button
        fireEvent.click(completeTasks);

        // check task is no longer in the document
        expect(newTask).not.toBeInTheDocument();
    });

    test("Menu Contains category links", () => {
        // create a category, and expect it to be in the menu as a link
        const categoryMenuLink = screen.getByTestId("New-Category-menu-link");
        expect(categoryMenuLink).toBeInTheDocument();
    });

    test("Menu Contains Clear data button", () => {
        window.confirm = jest.fn(() => true);
        // click the clear data button and check if the category exists. The only problem, is that the clear data button is triggered by a window confirm.

        // expect the base state of the store (0 tasks in 1 category)
        const categoryTitle = screen.getByText("New Category ( 0 )");
        expect(categoryTitle).toBeInTheDocument();

        // CLICK CLEAR DATA BUTTON
        const clearData = screen.getByText("Clear all data");
        expect(clearData).toBeInTheDocument();
        fireEvent.click(clearData);
        expect(window.confirm).toBeCalledWith(
            "are you sure you want to delete all data"
        );

        // EXPECT NO CATEGORY

        // not sure how to test localStorage.clear
    });
});
