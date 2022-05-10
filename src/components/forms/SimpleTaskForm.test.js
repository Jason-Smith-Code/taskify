import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import App from "../../app/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { TaskForm } from "./TaskForm";

// https://jestjs.io/docs/expect

describe("<SimpleTaskForm />", () => {
    
    // setup the redux store
    test("Task Form doesnt render with empty categories", () => {
        // render the App

        // add a category

        // click the menu link to visit that category

        // identify the task form

        // fill out task title

        // fill out task description

        // identify the 
    });
});
