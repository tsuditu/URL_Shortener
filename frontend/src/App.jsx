import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UrlInput from './components/UrlInput';
import ShortLink from './components/ShortLink';
import { Spinner } from 'reactstrap';
import HistoryList from './components/HistoryList';

// Main React component of the app.
// When the project runs with `npm start`, React automatically calls this function
// (from main.jsx) and renders its returned JSX inside <div id="root"> in index.html.
// The frontend server opens http://localhost:3000 to serve this React app (including index.html).
// Index.html contains a div with id "root" where this App component is mounted and that's how it will be displayed in the browser.

function App() {
  // State for the input field value
  const [inputUrl, setInputUrl] = useState('');
  // State for the generated short URL
  const [shortUrl, setShortUrl] = useState('');
  // State for display URL text
  const [displayUrl, setDisplayUrl] = useState('');
  // State to indicate if a request is in progress (for loading spinner)
  const [loading, setLoading] = useState(false);

  // State for history list
  const [history, setHistory] = useState([]);

  // Fetch history from backend
  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history/?page=1&page_size=10');
      const data = await res.json();
      if (data.history) setHistory(data.history);
    } catch (err) {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
      const res = await fetch('/api/shorten/', {
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
        try {
          const parsed = new URL(inputUrl);
          const code = data.short_url.split('/').pop();
          setDisplayUrl(`${parsed.origin}/${code}`);
        } catch {
          setDisplayUrl(data.short_url); // fallback
        }
      } else {
        alert(data.error || 'Something went wrong!');
      }
      // Refetch history after shortening
      fetchHistory();
    } catch (err) {
      // Handle network or server errors
      console.error('Error communicating with Django:', err);
      alert('Failed to connect to backend.');
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  };

  // Render the main UI: input form, short link result, and history
  return (
    <div className="container text-center mt-5">
      <h1>URL Shortener MVP</h1>

      {/* Central spinner displayed while waiting for backend response */}
      {loading && (
        <div className="d-flex flex-column align-items-center mt-4">
          <Spinner color="primary" />
          <p className="mt-2 text-muted">Generating short link...</p>
        </div>
      )}

      {/* Input form and short link display */}
      <UrlInput
        inputUrl={inputUrl}
        setInputUrl={setInputUrl}
        handleShorten={handleShorten}
        loading={loading}
      />
      {/* Display the ShortLink component only when not loading */}
      {!loading && <ShortLink shortUrl={shortUrl} displayUrl={displayUrl}/>} 

      {/* History list */}
      <HistoryList history={history} />
    </div>
  );
}

export default App;