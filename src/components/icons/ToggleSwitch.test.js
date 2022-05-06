import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ToggleSwitch } from "./ToggleSwitch";
import React from "react";
import "@testing-library/jest-dom";

test("Test theme button toggle", () => {
    render(<ToggleSwitch />);
    const toggleSwitch = screen.getByTestId("light-dark-toggle");
    expect(toggleSwitch).toBeInTheDocument();

    //  Expect current theme to be light
    const labelElement = document.getElementById("theme-toggle");
    console.log(`switch label : ${labelElement}`);

    const element = window
        .getComputedStyle(labelElement, null)
        .getPropertyValue("color");
    console.log(`style : ${element}`);

    const elementStyle = element.style;
    var out = "";

    for (prop in elementStyle) {
        if (elementStyle.hasOwnProperty(prop)) {
            out +=
                "  " +
                prop +
                " = '" +
                elementStyle[prop] +
                "' > '" +
                computedStyle[prop] +
                "'\n";
        }
    }
    console.log(out);

    fireEvent.click(toggleSwitch);

    // expect current theme to be dark
});
