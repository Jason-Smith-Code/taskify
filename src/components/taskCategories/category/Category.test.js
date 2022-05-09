import { Provider } from "react-redux";
import { Category } from "./Category";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";

describe("<Category />", () => {
    const initialState = {
        categories: {
            categoryList: [
                {
                    title: "Category Title",
                    id: 55,
                },
            ],
        },
        tasks: {
            taskList: [
                {
                    title: "task 1",
                    description: "task 1 description",
                    id: 1,
                    category: 55,
                },
                {
                    title: "task 2",
                    description: "task 2 description",
                    id: 2,
                    category: 55,
                },
                {
                    title: "task 3",
                    description: "task 3 description",
                    id: 3,
                    category: 55,
                },
            ],
        },
    };
    const mockStore = configureStore();
    let store;

    test("Category renders", () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <Category />
            </Provider>
        );

        let taskListLength = initialState.tasks.taskList.length;
        console.log(taskListLength);

        // edit category button
        const editCategoryButton = screen.getByTestId("edit-category-button");
        expect(editCategoryButton).toBeInTheDocument();

        // delete category button
        const deleteCategoryButton = screen.getByTestId(
            "delete-category-button"
        );
        expect(deleteCategoryButton).toBeInTheDocument();

        // category title

            // NOTE THE STORE IS NOT DELIVERING THE GOODS TO THE FRONT END. PERHAPS I NEED TO IMPORT APP

            // or try using the real store instead of mock store
        const categoryTitle = screen.getByRole('heading', {name: /Category Title ( 3 )/i})
        console.log(categoryTitle);
        expect(categoryTitle).toBeInTheDocument();

        // number of tasks rendered next to title

        // check when using this that the length of category list is reduced by one
        // check the title before and after the change
        // fill in some tasks, and add a category to the store state
        // check that those tasks have rendered by checking the length of taskList
    });
});
