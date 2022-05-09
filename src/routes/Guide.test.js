import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Guide } from "./Guide";
import { BrowserRouter } from "react-router-dom";

describe("<Guide />", () => {
    jest.mock("../assets/images/add-category-form.jpg");
    jest.mock("../assets/images/delete-category.jpg");

    test("Guide page renders", () => {
        render(
            <BrowserRouter>
                <Guide />
            </BrowserRouter>
        );

        const guideText = screen.getByText("Guide");
        expect(guideText).toBeInTheDocument();
        const IconTest = screen.getByText("Icons");
        expect(IconTest).toBeInTheDocument();
    });
});
