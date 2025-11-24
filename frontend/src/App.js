import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UrlInput from './components/UrlInput';
import ShortLink from './components/ShortLink';

// Main React component of the app.
// When the project runs with `npm start`, React automatically calls this function
// (from index.js) and renders its returned JSX inside <div id="root"> in index.html.
// The frontend server opens http://localhost:3000 to serve this React app (including index.html).
// Index.html contains a div with id "root" where this App component is mounted and that's how it will be displayed in the browser.

function App() {
  // State for the input field value
  const [inputUrl, setInputUrl] = useState('');
  // State for the generated short URL
  const [shortUrl, setShortUrl] = useState('');
  // State to indicate if a request is in progress (for loading spinner)
  const [loading, setLoading] = useState(false);

  // Handles the click event for shortening the URL
  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      alert('Please enter a URL first!');
      return;
    }

    // Basic URL validation (must start with http:// or https://)
    const urlPattern = /^(https?:\/\/)[\w-]+(\.[\w-]+)+[/#?]?.*$/;
    if (!urlPattern.test(inputUrl)) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }

    // Show loading spinner and deactivate 'Shorten' button until request completes and 'loading' is set to false
    setLoading(true);

    try {
      // Send POST request to Django backend API to shorten the URL
      const res = await fetch('http://127.0.0.1:8000/api/shorten/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      // Parse JSON response from backend
      const data = await res.json();
      if (data.short_url) {
        setShortUrl(data.short_url); // Update state with new short URL
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (err) {
      // Handle network or server errors
      console.error('Error communicating with Django:', err);
      alert('Failed to connect to backend.');
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  };

  // Render the main UI: input form and short link result
  return (
    <div className="container text-center mt-5">
      <h1>URL Shortener MVP</h1>
      <UrlInput
        inputUrl={inputUrl}
        setInputUrl={setInputUrl}
        handleShorten={handleShorten}
        loading={loading}
      />
      <ShortLink shortUrl={shortUrl} />
    </div>
  );
}

export default App;