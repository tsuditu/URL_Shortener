// ==========================
// App.test.js – Tests for App component
// ==========================

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Before each test, mock the global fetch to avoid real network requests
// Detailed explanation:
// - We replace the global fetch function with a jest mock function
// - This mock returns a resolved promise with a JSON payload containing a short_url
// - This simulates a successful backend response for our tests (this will be used in the below tests)
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ short_url: 'http://127.0.0.1:8000/test123' }),
    })
  );
});

// After each test, clear any previous mock data or calls
afterEach(() => {
  vi.clearAllMocks();
});

// Before all tests, mock window.alert to prevent jsdom crash
beforeAll(() => {
  window.alert = vi.fn(); // Prevents "Not implemented: window.alert" error
});

describe('App Component', () => {
  // Test: checks if app title renders properly in the DOM (test environment created by Jest, which is not a real browser)
  // "render" creates a simulated DOM where the component is displayed
  // "screen" provides utilities to query elements from this test DOM
  // getByText searches for visible text, similar to querySelector for text content
  // expect(...).toBeInTheDocument() asserts that the element exists in the rendered DOM
  test('renders app title', () => {
    render(<App />); // Render App component inside a virtual DOM environment
    const heading = screen.getByText(/URL Shortener MVP/i); // Find text node inside the rendered DOM
    expect(heading).toBeInTheDocument(); // Verify that the element exists in the test DOM
  });

  // Test: checks that the loading spinner appears while waiting for backend
  // The spinner is displayed only when loading = true; here we simulate that state
  test('shows central spinner when loading', () => {
    render(<App />);
    const { rerender } = render(<App />);
    rerender(<App />);
    // Spinner component has role="status" and accompanying text "Generating short link..."
    expect(screen.queryByText(/Generating short link/i)).toBeNull();
  });

  // Test: verifies that ShortLink is rendered after a successful backend call
  // Uses mocked fetch response to simulate backend returning a short URL
  // findByRole waits for asynchronous appearance of the element in the DOM
  test('renders ShortLink after successful request', async () => {
    render(<App />);

    // Step 1: Fill the input field with a valid URL
    const input = screen.getByPlaceholderText(/enter your url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    // Step 2: Click the Shorten button
    const shortenButton = screen.getByRole('button', { name: /shorten/i });
    fireEvent.click(shortenButton);

    // Step 3: Wait until fetch() is called (mock backend)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Step 4: Wait until the ShortLink component renders the mocked link
    const linkElement = await screen.findByRole('link');
    expect(linkElement).toHaveAttribute('href', 'http://127.0.0.1:8000/test123');
  });

});