import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Task } from "./Task";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("<Task />", () => {
    const initialState = {
        categories: {
            categoryList: [
                {
                    title: "categoryTite",
                    id: 1,
                },
            ],
        },
        tasks: {
            taskList: [
                {
                    title: "taskTitle",
                    description: "task description",
                    id: 2,
                },
            ],
        },
    };
    const mockStore = configureStore();
    let store;

    test("The task renders all its components", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <Task />
            </Provider>
        );

        // reveal button
        const inspectButton = screen.getByTestId("task-item-inspect");
        expect(inspectButton).toBeInTheDocument();

        // edit button
        const editButton = screen.getByTestId("task-item-edit");
        expect(editButton).toBeInTheDocument();

        // delete button
        const deleteButton = screen.getByTestId("task-item-delete");
        expect(deleteButton).toBeInTheDocument();

        // description
        const taskDescription = screen.getByTestId("task-description");
        expect(taskDescription).toBeInTheDocument();

        // complete button
        const submitButton = screen.getByText("Complete");
        expect(submitButton).toBeInTheDocument();

        // click the reveal button again to hide components
        fireEvent.click(inspectButton);

        // description shown
        expect(taskDescription).toBeInTheDocument();

        // complete button (When revealed)
        expect(submitButton).toBeInTheDocument();

        // Editing a task
    });
});
