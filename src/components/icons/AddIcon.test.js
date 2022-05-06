import { AddIcon } from "./AddIcon";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("<AddIcon />", () => {
    test("renders the icon container", () => {
        render(<AddIcon />);
        const addIconContainer = screen.getByTestId("add-icon-container");
        expect(addIconContainer).toBeInTheDocument();
    });
    test("renders the icon container", () => {
        render(<AddIcon />);
        const addIcon = screen.getByTestId("add-icon");
        expect(addIcon).toBeInTheDocument();
    });

    test("renders the '+' icon", () => {
        render(<AddIcon />);
        const plusText = screen.getByText("+");
        expect(plusText).toBeInTheDocument();
    });
});
