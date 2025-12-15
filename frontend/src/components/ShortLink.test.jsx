// ==========================
// ShortLink.test.js – Tests for ShortLink component
// ==========================

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShortLink from './ShortLink';
import { vi } from 'vitest';


describe('ShortLink Component', () => {
  beforeAll(() => {
    // Mock isSecureContext and clipboard API
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(),
      },
    });
  });

  // Test: verifies that component renders nothing when no URL is provided
  test('renders nothing if no shortUrl provided', () => {
    const { container } = render(<ShortLink shortUrl="" />);
    // If no content is rendered, firstChild should be null
    expect(container.firstChild).toBeNull();
  });

  // Test: verifies that alert and link are displayed when shortUrl exists
  test('renders alert with short URL when provided', () => {
    const url = 'http://127.0.0.1:8000/abc123';
    render(<ShortLink shortUrl={url} />);
    // Text label should appear
    expect(screen.getByText(/shortened url/i)).toBeInTheDocument();
    // Link should have correct href attribute
    expect(screen.getByRole('link')).toHaveAttribute('href', url);
  });

  // Test: copy button copies link and shows feedback
  test('copy button copies link and shows feedback', async () => {
    const url = 'http://127.0.0.1:8000/abc123';
    render(<ShortLink shortUrl={url} />);
    const copyBtn = screen.getByRole('button', { name: /copy short url/i });
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(url);
    // Feedback appears
    expect(await screen.findByText(/copied!/i)).toBeInTheDocument();
    // Feedback disappears after timeout
    await waitFor(() => {
      expect(screen.queryByText(/copied!/i)).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
