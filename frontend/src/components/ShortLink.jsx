// ==========================
// ShortLink.jsx – Short URL Display Component (Detailed Comments)
// ==========================

import React from 'react';
import { Alert } from 'reactstrap';

/// This is also a stateless (presentational) component.
// It receives one prop from App.js:
// - shortUrl: the shortened URL returned from the backend.
//
// Behavior:
// - If shortUrl is empty (no URL generated yet), it returns null (renders nothing).
// - If shortUrl has a value, it displays a Bootstrap success alert with the clickable short link.
function ShortLink({ shortUrl }) {
  // Conditional rendering: if shortUrl doesn't exist, render nothing.  
  if (!shortUrl) return null;
  
  // When shortUrl exists, render a green success alert with a clickable link.
  return (
    <Alert color="success" className="mt-4 text-center">
      {/* Static text for label */}
      Shortened URL:{' '}
      
      {/* Anchor tag for the short link */}
      {/* href: navigates to the short URL. */}
      {/* target="_blank": opens the link in a new tab. */}
      {/* rel="noreferrer": improves security by preventing the referrer header from being sent. */}
      <a href={shortUrl} target="_blank" rel="noreferrer">
        {shortUrl} {/* The visible link text shown to the user */}
      </a>
    </Alert>
  );
}

export default ShortLink; 