// ==========================
// UrlInput.test.js – Tests for UrlInput component
// ==========================

import { render, screen, fireEvent } from '@testing-library/react';
import UrlInput from './UrlInput';

describe('UrlInput Component', () => {
  // Test: verifies that input and button are displayed
  test('renders input field and button', () => {
    render(
      <UrlInput
        inputUrl=""
        setInputUrl={() => {}}
        handleShorten={() => {}}
        loading={false}
      />
    );
    // The placeholder helps identify the input element
    expect(screen.getByPlaceholderText(/enter your url/i)).toBeInTheDocument();
    // Button should contain text 'Shorten'
    expect(screen.getByRole('button', { name: /shorten/i })).toBeInTheDocument();
  });

  // Test: checks that typing in input triggers setInputUrl function
  test('calls setInputUrl when typing in input', () => {
    const mockSetInputUrl = jest.fn(); // mock function to track calls
    render(
      <UrlInput
        inputUrl=""
        setInputUrl={mockSetInputUrl}
        handleShorten={() => {}}
        loading={false}
      />
    );
    const input = screen.getByPlaceholderText(/enter your url/i);
    // Simulate typing in input
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    // Expect function to be called with typed value
    expect(mockSetInputUrl).toHaveBeenCalledWith('https://example.com');
  });

  // Test: verifies that button is disabled and spinner appears when loading is true
  test('disables button and shows spinner when loading', () => {
    render(
      <UrlInput
        inputUrl=""
        setInputUrl={() => {}}
        handleShorten={() => {}}
        loading={true}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled(); // Button should be disabled
    // Spinner should be rendered with role 'status'
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});