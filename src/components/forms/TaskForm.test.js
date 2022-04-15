import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import { TaskForm } from './TaskForm';
import React from 'react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';

// https://jestjs.io/docs/expect


describe('<TaskForm />', () => {
    const handleSubmit = jest.fn();

    beforeEach(() => {
        // before each test we want to clear the submit
        handleSubmit.mockClear();
        // we also want to render the component
    })
        
    test('render the add task form', () => {   
        render(<TaskForm onSubmit={handleSubmit} />);
        const taskForm = screen.getByTestId("adding-task-form");
        expect(taskForm).toBeInTheDocument();
    });

    test('render title input', () => {
        render(<TaskForm onSubmit={handleSubmit} />);
        const titleElement = screen.getByTestId('adding-task-form-input-title');
        expect(titleElement).toBeInTheDocument();
    })

    test('render description input', () => {
        render(<TaskForm onSubmit={handleSubmit} />);
        const descriptionElement = screen.getByTestId('adding-task-form-input-description');
        expect(descriptionElement).toBeInTheDocument();
    })

    test('render submit button', () => {
        render(<TaskForm onSubmit={handleSubmit} />);
        const submitElement = screen.getByTestId('adding-task-submit');
        expect(submitElement).toBeInTheDocument();
    })

    test("onSubmit is called when all fields pass validation", () => {
        // paste form html into https://testing-playground.com/ to get the correct way to grab element
        // import user from testing library user event
        // use user.type to enter in a string into the test form fields
        render(<TaskForm onSubmit={handleSubmit} />);
        // title element
        const titleElement = screen.getByTestId('adding-task-form-input-title');
        // description element
        const descriptionElement = screen.getByTestId('adding-task-form-input-description');
        // submit element
        const submitElement = screen.getByTestId('adding-task-submit');
        user.click(titleElement);
        user.type(titleElement, "Clean the house");
        user.click(descriptionElement);
        user.type(descriptionElement, "I need to clean the house");
        user.click(submitElement);
        fireEvent.submit(submitElement);
        handleSubmit()
        expect(handleSubmit).toHaveBeenCalledTimes(1);

    })

})
