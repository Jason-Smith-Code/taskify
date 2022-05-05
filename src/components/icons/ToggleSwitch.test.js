import {render, screen, fireEvent} from '@testing-library/react';
import { ToggleSwitch } from "./ToggleSwitch";
import { CategoryForm } from '../forms/CategoryForm';
import React from 'react';
import '@testing-library/jest-dom';

describe('<ToggleSwitch />', () => {

    // check the parent container of the switch is rendered
    test('Renders the switch', () => {
        render(<ToggleSwitch />);
        const lightDarkSwitch = screen.getByTestId("light-dark-switch");
        expect(lightDarkSwitch).toBeInTheDocument();
    })

    // Check css colors actualy change
    test('The colour changes when the user clicks the toggle', () => {
        // Render a h2 title to test colour difference
        render(<h2 data-testid="title-element">Test Title</h2>)
        // Render the toggle switch to toggle the change
        render(<ToggleSwitch />);

        // store the title element
        const titleText = screen.getByTestId("title-element");
        // check the stored titles color
        expect(titleText).toHaveStyle(`color: var(--Color2Light)`)
        // click even on the toggle
        fireEvent.click(screen.getByTestId('light-dark-toggle'));
        // check that the colour has changed
        expect(titleText).toHaveStyle(`color: #ffffff`)
    })

})