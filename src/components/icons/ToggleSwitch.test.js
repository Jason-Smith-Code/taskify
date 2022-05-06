import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleSwitch } from "./ToggleSwitch";
import React from "react";
import "@testing-library/jest-dom";

describe("<ToggleSwitch />", () => {
    test('toggle switch', () => {       
        render(<ToggleSwitch />);
    });
})
