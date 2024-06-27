import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders input element', () => {
    const { queryByRole } = render(<NumberOfEvents eventsPerPage={32} />);
    const inputElement = queryByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of input field is 32', () => {
    const { queryByRole } = render(<NumberOfEvents eventsPerPage={32} />);
    const inputElement = queryByRole('spinbutton');
    expect(inputElement.value).toBe('32');
  });

  test('updates input value when user types in it', async () => {
    const { queryByRole } = render(<NumberOfEvents eventsPerPage={32} />);
    const inputElement = queryByRole('spinbutton');
    await userEvent.type(inputElement, '{backspace}{backspace}10');
    expect(inputElement.value).toBe('10');
  });
});
