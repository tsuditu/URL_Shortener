// Testing utilities
import { render, screen } from '@testing-library/react';
// Component to test
import App from './App';

// Test: checks if app title renders
test('renders app title', () => {
  render(<App />); // Render App component
  const heading = screen.getByText(/URL Shortener MVP/i); // Find text in the DOM (test environment)
  expect(heading).toBeInTheDocument(); // Verify it's displayed
});
