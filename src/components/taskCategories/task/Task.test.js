import { Provider } from "react-redux";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { testStore } from "../../../app/createTestStore";
import App from "../../../app/App";
import { BrowserRouter } from "react-router-dom";

describe("Your test", () => {
    afterAll(cleanup);

    test("Your component with a full reducer flow", () => {
        // Create a redux store
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        //screen.debug();

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
        // click submit button
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

        // identify inspect button + expect it to be in the document
        const inspectButton = screen.getByTestId("task-item-inspect");
        expect(inspectButton).toBeInTheDocument();

        // test the inspect button by clicking it, this will reveal the description and complete button
        fireEvent.click(inspectButton);
        const taskDescription = screen.getByText("New Task description");
        expect(taskDescription).toBeInTheDocument();
        const completeButton = screen.getByText("Complete");
        expect(completeButton).toBeInTheDocument();
        fireEvent.click(completeButton);

        // test that we can hide the description and complete button
        fireEvent.click(inspectButton);
        expect(taskDescription).not.toBeInTheDocument();
        expect(completeButton).not.toBeInTheDocument();

        // identify edit button + expect it to be in the document
        const editButton = screen.getByTestId("task-item-edit");
        expect(editButton).toBeInTheDocument();

        // test the edit button by changing the name and description
        // click edit button
        fireEvent.click(editButton);
        // identify the title input by its placeholder
        const editTaskTitleInput = screen.getByDisplayValue("New Task");
        expect(editTaskTitleInput).toBeInTheDocument();
        // test title required dislayed
        fireEvent.change(editTaskTitleInput, {
            target: { value: "" },
        });
        expect(editTaskTitleInput).toHaveValue("");
        const titleRequired = screen.getByTestId("task-edit-title-required");
        // expect title required to appear
        expect(titleRequired).toHaveTextContent("New Title Required");
        // test the max title size by filling in 40 characters, and see the warning on screen
        fireEvent.change(editTaskTitleInput, {
            target: { value: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww" },
        });
        expect(editTaskTitleInput).toHaveValue(
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
        );
        // expect title required to not show anything
        expect(titleRequired).toHaveTextContent("");
        const formMessage = screen.getByTestId("form-message");
        expect(formMessage).toBeInTheDocument();
        expect(formMessage).toHaveTextContent("Remaining characters: 0");
        // change the title
        fireEvent.change(editTaskTitleInput, {
            target: { value: "Editted Task Title" },
        });
        // identify the description input by its placeholder
        const editTaskDesciptionInput = screen.getByDisplayValue(
            "New Task description"
        );
        expect(editTaskDesciptionInput).toBeInTheDocument();
        // change the description

        // check if description required is rendered when editTaskDesciptionInput = ""
        fireEvent.change(editTaskDesciptionInput, {
            target: { value: "" },
        });
        expect(editTaskDesciptionInput).toHaveValue("");
        //identify the required description text
        const requiredDescription = screen.getByTestId(
            "task-edit-description-required"
        );
        expect(requiredDescription).toHaveTextContent("Description Required");

        fireEvent.change(editTaskDesciptionInput, {
            target: { value: "Editted Task Description" },
        });
        // identify the category radio by data id since there will be more than one on screen
        const editTaskRadioInput = screen.getByTestId("New Category radio");
        expect(editTaskRadioInput).toBeInTheDocument();
        // keep the category the same since we only have one
        fireEvent.click(editTaskRadioInput);
        // identify the confirm button by its text
        const confirmButton = screen.getByRole("button", { name: /Confirm/i });
        expect(confirmButton).toBeInTheDocument();
        // submit the changed task
        fireEvent.click(confirmButton);

        // identify delete button + expect it to be in the document
        const taskDeleteButton = screen.getByTestId("task-item-delete");
        // click delete button
        fireEvent.click(taskDeleteButton);
        // expect the task to no longer be there
        const categoryWithNoTasks = screen.getByText("New Category ( 0 )");
        expect(categoryWithNoTasks).toBeInTheDocument();

        // mark a task as complete
        // create a new task
        fireEvent.change(titleInput, {
            target: { value: "Task to complete" },
        });
        fireEvent.change(descriptionElement, {
            target: { value: "Task to complete description" },
        });
        fireEvent.click(testCategoryRadioOption);
        fireEvent.click(taskSubmitButton);
        // expect the current category to have 1 task in it

        // click the inspect button
        fireEvent.click(inspectButton);
        fireEvent.click(completeButton);
        // expect the current category to have no tasks in it

        // check that the completed tasks list contains the task
    });
});
