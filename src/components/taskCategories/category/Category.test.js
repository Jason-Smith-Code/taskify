import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { testStore } from "../../../app/createTestStore";
import App from "../../../app/App";
import { BrowserRouter } from "react-router-dom";

describe("<Category />", () => {
    let confirmSpy;
    beforeAll(() => {
        confirmSpy = jest.spyOn(window, "confirm");
        confirmSpy.mockImplementation(jest.fn(() => true));
    });
    afterAll(() => confirmSpy.mockRestore());

    test("Expect the title of the category", () => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        // the store has nothing in it, lets add a category
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
        // expect it to be in the document
        expect(categoryTitle).toBeInTheDocument();
        // expect it to be a link
        expect(categoryTitle).toHaveAttribute("href", "/category/New-Category");

        // i need to add a task and place it in the category after first creating a category
        // identify the task title input
        const titleInput = screen.getByPlaceholderText("Enter Task Title");
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveAttribute("type", "text");
        // change the task title input
        fireEvent.change(titleInput, {
            target: { value: "New Task" },
        });
        // identfy the description
        const descriptionElement = screen.getByPlaceholderText(
            "Enter Task Description"
        );
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveAttribute("type", "text");
        // change the description
        fireEvent.change(descriptionElement, {
            target: { value: "New Task description" },
        });
        // identify the radio input for category
        const optionsContainer = screen.getByTestId("options-container");
        expect(optionsContainer).toBeInTheDocument();
        const testCategoryRadioOption = screen.getByRole(
            "radio",
            "New Category"
        );
        expect(testCategoryRadioOption).toHaveAttribute("type", "radio");
        // select the radio input
        fireEvent.click(testCategoryRadioOption);
        // identify the submit task button
        const taskSubmitButton = screen.getByRole("button", {
            name: /Add Task/i,
        });
        expect(taskSubmitButton).toBeInTheDocument();
        // click the submit task button
        fireEvent.click(taskSubmitButton);

        // expect the text to show that there is ( 1 ) task in the category
        const updatedCategoryTitle = screen.getByText("New Category ( 1 )");
        expect(updatedCategoryTitle).toBeInTheDocument();
        // edit a category
        // edit category button
        const editCategoryButton = screen.getByTestId("edit-category-button");
        expect(editCategoryButton).toBeInTheDocument();
        fireEvent.click(editCategoryButton);
        expect(screen.getByText("Set new Title")).toBeInTheDocument();

        // identify the edit category title field
        const editCategoryInput = screen.getByTestId(
            "edit-category-title-input"
        );
        // change the input value
        fireEvent.change(editCategoryInput, {
            target: { value: "Changed Title" },
        });
        // identify the confirm button
        const confirmEditCategoryButton = screen.getByRole("button", {
            name: /Confirm/i,
        });
        // click the confirm button
        fireEvent.click(confirmEditCategoryButton);
        // identify and expect the new category
        const newCategoryTitle = screen.getByText("Changed Title ( 1 )");
        expect(newCategoryTitle).toBeInTheDocument();
    });

    test("title warning - category exists with same title", async () => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        const addACategoryInput = screen.getByPlaceholderText(
            "Enter category Title"
        );
        
        // test trying to add a new category with the same title as an existing one "Changed Title"
        fireEvent.change(addACategoryInput, {
            target: { value: "Changed Title" },
        });
        expect(addACategoryInput).toHaveValue("Changed Title");
        // expect to see warning
        const sameTitleWarning = screen.getByText(
            "Another category exists with the same title"
        );
        expect(sameTitleWarning).toBeInTheDocument();
        // check that the warniing does not show if the title is not the same as an existing title
        fireEvent.change(addACategoryInput, {
            target: { value: "Changed Title2" },
        });
        expect(addACategoryInput).toHaveValue("Changed Title2");
        expect(sameTitleWarning).not.toBeInTheDocument();
    });

    test("deleting a category", async () => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        const newCategoryTitle = screen.getByText("Changed Title ( 1 )");
        expect(newCategoryTitle).toBeInTheDocument();
        // delete a category
        // delete category button
        const deleteCategoryButton = screen.getByTestId(
            "delete-category-button"
        );
        expect(deleteCategoryButton).toBeInTheDocument();
        // click the delete button

        fireEvent.click(deleteCategoryButton);

        // expect to not find any category on screen
        expect(newCategoryTitle).not.toBeInTheDocument();
    });
});
