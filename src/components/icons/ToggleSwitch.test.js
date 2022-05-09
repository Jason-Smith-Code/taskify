import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../../app/App.css";
import "../../../__mocks__/styleMock";

// Since this toggle affects the entire appearance of the app, I will need to import App

describe("<ToggleSwitch />", () => {
    const initialState = {
        categories: {
            categoryList: [],
        },
        tasks: {
            taskList: [],
        },
    };
    const mockStore = configureStore();
    let store;

    test("toggle switch", () => {
        store = mockStore(initialState);
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        const logSpy = jest.spyOn(console, "log");

        let value =
            document.documentElement.style.getPropertyValue("--Color2Light");

        console.log(`the color is of --Color2Light is: ${value}`);
        expect(value).toBe("#69009e");

        // interact with toggle to switch theme
        const button = screen.getByTestId("theme-toggle");

        fireEvent.click(button);

        console.log(`the color is of --Color2Light is: ${value}`);
        expect(value).toBe("#ffffff");

        expect(logSpy).toHaveBeenCalledWith("theme: dark");
        fireEvent.click(button);
        expect(logSpy).toHaveBeenCalledWith("theme: light");
    });
});
