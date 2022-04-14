import {render, screen} from '@testing-library/react';
import { TaskForm } from './TaskForm';
import React from 'react';
import '@testing-library/jest-dom';


describe('<TaskForm />', () => {
    test('renders react component', () => {
        render(<TaskForm />);
        const divElement = screen.getByText(/Task Title/i);
        expect(divElement).toBeInTheDocument();
    });
})