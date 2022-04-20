import {render, fireEvent} from '@testing-library/react';
import { TaskForm } from './TaskForm';
import React from 'react';
import '@testing-library/jest-dom';
//import user from '@testing-library/user-event';
// https://jestjs.io/docs/expect

describe('<TaskForm />', () => {

    test('render the add task form', () => {     
        const { getByTestId } = render(<TaskForm />);    
        const taskForm = getByTestId("adding-task-form");
        expect(taskForm).toBeInTheDocument();
    });

    test('render title input', () => {
        const { getByTestId } = render(<TaskForm />);
        const titleElement = getByTestId('adding-task-form-input-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveAttribute('type', 'text');
    })

    test('render description input', () => {
        const { getByTestId } = render(<TaskForm />);
        const descriptionElement = getByTestId('adding-task-form-input-description');
        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveAttribute('type', 'text');
    })

    test("Form successfully submitted filled in", () => {
        const logSpy = jest.spyOn(console, "log");
        const handleSubmit = jest.fn();
        const { getByTestId, getByText } = render(<TaskForm onSubmit={handleSubmit} />);
        const inputValue1 = "hi this is a new title";
        const inputValue2 = "hi this is a new descrption";

        fireEvent.change(getByTestId('adding-task-form-input-title'), { target: { value: inputValue1 } });
        fireEvent.change(getByTestId('adding-task-form-input-description'), { target: { value: inputValue2 } });
        fireEvent.click(getByText(/Add Task/i));
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(`Submitting Name ${inputValue1} & ${inputValue2}`);
    });

    test('Form cannot be submitted if input fields are empty', () => {
        const message = "a field is empty, form cannot be submitted";
        const emptyString = "";
        const logSpy = jest.spyOn(console, "log");
        const handleSubmit = jest.fn();
        const { getByTestId, getByText } = render(<TaskForm onSubmit={handleSubmit} />);

        fireEvent.change(getByTestId('adding-task-form-input-title'), { target: { value: emptyString } });
        fireEvent.change(getByTestId('adding-task-form-input-description'), { target: { value: emptyString } });
        fireEvent.click(getByText(/Add Task/i));
        expect(logSpy).toHaveBeenCalledWith(message);
    });

})



