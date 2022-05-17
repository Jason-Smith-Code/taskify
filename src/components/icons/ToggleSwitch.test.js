import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import { testStore } from "../../app/createTestStore";
import { BrowserRouter } from "react-router-dom";

// Since this toggle affects the entire appearance of the app, I will need to import App

describe("<ToggleSwitch />", () => {
    test("toggle switch", () => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        // const taskifyText = screen.getByText("Add a Category");
        // expect(taskifyText).toBeInTheDocument();
        // let propertyValue = getComputedStyle(taskifyText);
        // let style = propertyValue.color;
        // console.log(style);

        let value =
            document.documentElement.style.getPropertyValue("--Color2Light");
        expect(value).toBe("#69009e");

        // interact with toggle to switch theme
        // const label = screen.getByTestId("theme-toggle");
        const input = screen.getByTestId("light-dark-switch");
        console.log("clicking iinput button");
        fireEvent.click(input);
        expect(value).toBe("#ffffff");
        // Struggled to get this test to work, any advice is welcome
    });
});
