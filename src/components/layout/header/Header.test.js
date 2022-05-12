import { render, screen } from "@testing-library/react";
import React from "react";
import { Header } from "./Header";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("<Header />", () => {
    test("The Header is displayed", () => {
        // the header will contain a link so I need to wrap it in BrowserRouter
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // contains logo
        const logoText = screen.getByText("Taskify");
        expect(logoText).toBeInTheDocument();

        // logo contains link to home page
        expect(screen.getByRole("link")).toHaveAttribute("href", "/taskify");

        // contains a menu button
        const menu = screen.getByText("Menu");
        expect(menu).toBeInTheDocument();
    });
});
