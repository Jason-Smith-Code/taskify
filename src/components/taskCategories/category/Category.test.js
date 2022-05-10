import { Provider } from "react-redux";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { testStore } from "../../../app/createTestStore";
import App from "../../../app/App";
import { BrowserRouter } from "react-router-dom";

describe("Your test", () => {
    afterAll(cleanup);

    test("Your component with a full reducer flow", async () => {
        // Create a redux store
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        // the store has nothing in it, lets add a category
        // identiify category title input
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
        // cliick submit button
        fireEvent.click(addCategorySubmitButton);

        // expect the base state of the store (0 tasks in 1 category)
        const categoryTitle = screen.getByText("New Category ( 0 )");
        expect(categoryTitle).toBeInTheDocument();

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
        // identify the edit category title field
        const editCategoryInput = screen.getByPlaceholderText("New Category");
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
        // expect the new category title to be shown
        // identify the new category
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
        // expect the state of tasklist to be zero

        // expect to not fund any category on screen
        expect(newCategoryTitle).not.toBeInTheDocument();
    });
});
