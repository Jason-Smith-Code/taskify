import { render, screen } from "@testing-library/react";
import React from "react";
import { Footer } from "./Footer";
import "@testing-library/jest-dom";

describe("<Footer />", () => {
    test("The footer is displayed", () => {
        // expect the footer to be rendered
        render(<Footer />);
        const preText = screen.getByText("Designed and developed by");
        const gitHubLink = screen.getByText("Jason Smith");
        expect(preText).toBeInTheDocument();
        expect(gitHubLink).toBeInTheDocument();
    });
});
