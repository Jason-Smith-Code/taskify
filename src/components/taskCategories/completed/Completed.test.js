import { render, screen, fireEvent } from "@testing-library/react";
//import App from "../../../app/App";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Completed } from "./Completed";

describe("<Completed />", () => {
    const initialState = {
        categories: {
            categoryList: [
                {
                    title: "testCategory",
                    id: 2,
                },
            ],
        },
        tasks: {
            taskList: [
                {
                    id: 1,
                    title: "completedTask",
                    description: "completedTask",
                    show: false,
                    completed: true,
                    category: "complete",
                },
                {
                    id: 3,
                    title: "pendingTask",
                    description: "pendingTask",
                    show: false,
                    completed: false,
                    category: 2,
                },
            ],
        },
    };
    const mockStore = configureStore();
    let store;

    test("Check everything renders in completed category", () => {
        store = mockStore(initialState);
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Completed />
                </Provider>
            </BrowserRouter>
        );
        // identify completedTask by its text
        const completedTask = screen.getByText("completedTask");

        // Check if task text appears inside the completed tasks area
        expect(completedTask).toBeInTheDocument();
    });
});
