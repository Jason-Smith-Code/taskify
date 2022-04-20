import {CategoryForm} from './CategoryForm';
import {render} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

describe('<CategoryForm />', () => {

    test('render the add category form', () => {     
        const { getByTestId } = render(<CategoryForm />);    
        const categoryForm = getByTestId("adding-category-form");
        expect(categoryForm).toBeInTheDocument();
    });

    test('render input', () => {     
        const { getByTestId } = render(<CategoryForm />);    
        const categoryInput = getByTestId("adding-category-form-input-title");
        expect(categoryInput).toBeInTheDocument();
    });

    test('render submit button', () => {     
        const { getByTestId } = render(<CategoryForm />);    
        const categorySubmit = getByTestId("adding-task-submit");
        expect(categorySubmit).toBeInTheDocument();
    });

    test('Event prevent default', () => {

    })

    test('Clear form after submit', () => {
        
    })

    test('On category change', () => {
        
    })
})