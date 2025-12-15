// ==========================
// ShortLink.jsx – Short URL Display Component (Detailed Comments)
// ==========================


import React, { useState } from 'react';
import { Alert, Button } from 'reactstrap';

// Check if the environment variable exists; if not, display a warning in the console
let backendBase = import.meta.env.VITE_BACKEND_URL;
if (!backendBase) {
  console.warn(
    "VITE_BACKEND_URL is not defined in .env. Make sure the .env file exists and contains VITE_BACKEND_URL."
  );
  backendBase = "";
}

/// This is also a stateless (presentational) component.
// It receives one prop from App.js:
// - shortUrl: the shortened URL returned from the backend.
//
// Behavior:
// - If shortUrl is empty (no URL generated yet), it returns null (renders nothing).
// - If shortUrl has a value, it displays a Bootstrap success alert with the clickable short link.
function ShortLink({ shortUrl, displayUrl }) {
  const [copied, setCopied] = useState(false);
  if (!shortUrl) return null;
  // If shortUrl starts with http, use it directly; otherwise, prefix it with backendBase
  const realShortUrl = shortUrl.startsWith('http') ? shortUrl : backendBase + shortUrl;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(realShortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        // Fallback for unsupported browsers
        window.prompt('Copy the URL below:', realShortUrl);
      }
    } catch (err) {
      window.alert('Failed to copy. Please copy manually.');
    }
  };

  return (
    // Fade is used here to not display the alert with a fade-in effect
    <Alert color="success" className="mt-4 text-center" fade={false}>
      Shortened URL:{' '}
      <a href={realShortUrl} target="_blank" rel="noreferrer">
        {displayUrl || realShortUrl}
      </a>
      {' '}
      <Button
        color="outline-secondary"
        size="sm"
        className="ms-2 align-baseline"
        onClick={handleCopy}
        aria-label="Copy short URL"
      >
        Copy
      </Button>
      {copied && (
        <span className="ms-2 text-success" role="status">Copied!</span>
      )}
    </Alert>
  );
}

export default ShortLink; 