import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

describe("<Menu />", () => {
    const initialState = {
        categories: {
            categoryList: [
                {
                    title: "TestCategory",
                    id: 2045205052,
                },
            ],
        },
        tasks: {
            taskList: [],
        },
    };
    const mockStore = configureStore();
    let store;

    test("Menu hidden and revealed by user", () => {
        store = mockStore(initialState);
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        // the menu is not in the screen
        const menu = screen.getByTestId("hidden-menu");
        expect(menu).toHaveClass("hidden-menu");

        // user clicks open menu button
        const openMenuButton = screen.getByText("Menu");
        fireEvent.click(openMenuButton);
        expect(menu).not.toHaveClass("hidden-menu");

        // expect menu to contain the following

        // link to guide page
        expect(screen.getByRole("link-to-guide-page")).toHaveAttribute(
            "href",
            "/guide"
        );

        // link to taskify
        expect(screen.getByRole("link-to-main-page")).toHaveAttribute(
            "href",
            "/"
        );

        const testCategory = screen.getAllByText("TestCategory");
        // display links of categories from categoryList

        for (let i = 0; i < testCategory.length; i++) {
            expect(testCategory[i]).toBeInTheDocument();
        }

        // close menu
        const closeMenuButton = screen.getByText("Close menu");
        fireEvent.click(closeMenuButton);

        expect(menu).toHaveClass("hidden-menu");
    });
});
