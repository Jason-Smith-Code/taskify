import {CategoryForm} from './CategoryForm';
import {render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

describe('<CategoryForm />', () => {

    test('render the add category form', () => {     
        render(<CategoryForm />);    
        const categoryForm = screen.getByTestId("adding-category-form");
        expect(categoryForm).toBeInTheDocument();
    });

    test('render input', () => {     
        render(<CategoryForm />);    
        const categoryInput = screen.getByTestId("adding-category-form-input-title");
        expect(categoryInput).toBeInTheDocument();
    });

    test('render submit button', () => {     
        render(<CategoryForm />);    
        const categorySubmit = screen.getByTestId("adding-task-submit");
        expect(categorySubmit).toBeInTheDocument();
    });

    test('Event prevent default', () => {

    })

    test('Clear form after submit', () => {
        
    })

    test('On category change', () => {
        
    })
})