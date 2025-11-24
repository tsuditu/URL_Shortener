// ==========================
// ShortLink.test.js – Tests for ShortLink component
// ==========================

import { render, screen } from '@testing-library/react';
import ShortLink from './ShortLink';

describe('ShortLink Component', () => {
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
});
