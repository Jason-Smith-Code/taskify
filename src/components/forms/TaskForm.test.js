import { render, screen } from '@testing-library/react';
import TaskForm from './TaskForm';

test('Task from renders', () => {
  render(<TaskForm />);
  const textElement = screen.getByText(/title/i);
  expect(textElement).toBeInTheDocument();
});
