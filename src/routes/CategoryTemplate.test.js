import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../app/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("<CategoryTemplate />", () => {
    // create 2 tasks and 2 categories
    beforeEach(() => {
        const initialState = {
            categories: {
                categoryList: [
                    {
                        title: "rightCategory",
                        id: 101,
                    },
                    {
                        title: "wrongCategory",
                        id: 102,
                    },
                ],
            },
            tasks: {
                taskList: [
                    {
                        id: 1001,
                        title: "rightTask",
                        description: "rightTask",
                        show: false,
                        completed: false,
                        category: 101,
                    },
                    {
                        id: 1002,
                        title: "wrongTask",
                        description: "wrongTask",
                        show: false,
                        completed: false,
                        category: 102,
                    },
                ],
            },
        };
        const mockStore = configureStore();
        let store;
        store = mockStore(initialState);
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    });

    test("The category only shows items in a given category", () => {
        // navigate the user to the category page using fire events

        // identify and open menu
        const menu = screen.getByText("Menu");
        fireEvent.click(menu);

        // identify and click menu link to a category
        const rightCategory = screen.getByRole("link", {
            name: "rightCategory",
        });
        fireEvent.click(rightCategory);

        // check if rightTask has rendered inside rightCategory
        const rightTask = screen.getByText("rightTask");
        expect(rightTask).toBeInTheDocument();

        // check if wrongTask has rendered inside wrongCategory
        fireEvent.click(menu);
        const wrongCategory = screen.getByRole("link", {
            name: "wrongCategory",
        });
        fireEvent.click(wrongCategory);
        const wrongTask = screen.getByText("wrongTask");
        expect(wrongTask).toBeInTheDocument();

        // check if righttask was not rendered inside wrongcategory
        expect(rightTask).not.toBeInTheDocument();
    });
});
