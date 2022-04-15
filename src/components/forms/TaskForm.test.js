import {render, fireEvent} from '@testing-library/react';
//import {screen} from '@testing-library/dom';
import { TaskForm } from './TaskForm';
import React from 'react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';

// https://jestjs.io/docs/expect


describe('<TaskForm />', () => {
    const handleSubmit = jest.fn();
    // beforeEach(() => {
    //     // before each test we want to clear the submit
    //     handleSubmit.mockClear();
    // })
        
    test('render the add task form', () => {   
        const { getByTestId } = render(<TaskForm onSubmit={handleSubmit} />);
        const taskForm = getByTestId("adding-task-form");
        expect(taskForm).toBeInTheDocument();
    });

    test('render title input', () => {
        const { getByTestId } = render(<TaskForm onSubmit={handleSubmit} />);
        const titleElement = getByTestId('adding-task-form-input-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveAttribute('type', 'text');
    })

    test('render description input', () => {
        const { getByTestId } = render(<TaskForm onSubmit={handleSubmit} />);
        const descriptionElement = getByTestId('adding-task-form-input-description');
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveAttribute('type', 'text');
    })

    it("Form successfully submitted", () => {
        const onSubmit = jest.fn();
        const { getByLabelText, getByText } = render(<TaskForm onSubmit={onSubmit} />);
        const inputValue1 = "hi this is a new title";
        const inputValue2 = "hi this is a new descrption";

        fireEvent.change(getByLabelText(/Title/i), { target: { value: inputValue1 } });
        fireEvent.change(getByLabelText(/Description/i), { target: { value: inputValue2 } });
        fireEvent.click(getByText(/Submit/i));
      
      
        expect(onSubmit).toBeCalled();
    });

    test("onSubmit is called when all fields pass validation", () => {
        const handleSubmit = jest.fn();
        const { getByTestId, getByText } = render(<TaskForm onSubmit={handleSubmit} />);
        // paste form html into https://testing-playground.com/ to get the correct way to grab element
        // import user from testing library user event
        // use user.type to enter in a string into the test form fields

        const form = getByTestId('adding-task-form');
        const titleElement = getByTestId('adding-task-form-input-title');
        const descriptionElement = getByTestId('adding-task-form-input-description');
        const submitButton = getByTestId('adding-task-submit');

        //user.click(titleElement);
        //user.type(titleElement, {'target': {'value' : 'Clean the house'} });
        //user.click(descriptionElement);
        //user.type(descriptionElement, {'target': {'value' : 'I need to clean the house'} });
        //user.click(submitElement);

        fireEvent.change(titleElement, {'target': {'value' : 'Clean the house'} });
        expect(titleElement).toHaveValue("Clean the house");
        fireEvent.change(descriptionElement, {'target': {'value' : 'I need to clean the house'} });
        expect(descriptionElement).toHaveValue("I need to clean the house");
        fireEvent.click(getByText(/submit/i))

        fireEvent.change(titleElement, {'target': {'value' : 'Clean the house'} });
        expect(titleElement).toHaveValue("Clean the house");
        fireEvent.change(descriptionElement, {'target': {'value' : 'I need to clean the house'} });
        expect(descriptionElement).toHaveValue("I need to clean the house");
        fireEvent.submit(form);

        //expect(descriptionElement).toHaveBeenCalledWith('I need to clean the house');
        //expect(titleElement).toHaveBeenCalledWith('Clean the house');

        expect(handleSubmit).toHaveBeenCalledTimes(2);
    })

})



