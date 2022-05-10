import { Provider } from "react-redux";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import { testStore } from "../../app/createTestStore";
import { BrowserRouter } from "react-router-dom";

// Since this toggle affects the entire appearance of the app, I will need to import App

describe("<ToggleSwitch />", () => {
    afterAll(cleanup);

    test("toggle switch", () => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        let value =
            document.documentElement.style.getPropertyValue("--Color2Light");
        console.log(value);

        console.log(`the color is of --Color2Light is: ${value}`);
        expect(value).toBe("#69009e");

        // interact with toggle to switch theme
        const button = screen.getByTestId("theme-toggle");

        fireEvent.click(button);

        console.log(`the color is of --Color2Light is: ${value}`);
        expect(value).toBe("#ffffff");

        
    });
});
