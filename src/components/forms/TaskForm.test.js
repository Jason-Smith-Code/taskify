import {render, fireEvent} from '@testing-library/react';
//import {screen} from '@testing-library/dom';
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
        const { getByLabelText, getByText } = render(<TaskForm onSubmit={handleSubmit} />);
        const inputValue1 = "hi this is a new titl222222222222222222e";
        const inputValue2 = "hi this is a new descrption";

        fireEvent.change(getByLabelText(/Title/i), { target: { value: inputValue1 } });
        fireEvent.change(getByLabelText(/Description/i), { target: { value: inputValue2 } });
        fireEvent.click(getByText(/Add Task/i));
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith(`Submitting Name ${inputValue1} & ${inputValue2}`);
    });

})



