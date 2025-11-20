import { useState } from "react";

// Main React component of the app.
// When the project runs with `npm start`, React automatically calls this function
// (from index.js) and renders its returned JSX inside <div id="root"> in index.html.
// The frontend server opens http://localhost:3000 to serve this React app (including index.html).
// Index.html contains a div with id "root" where this App component is mounted and that's how it will be displayed in the browser.

// It manages state for the input URL and the shortened URL,
// sends a POST request to the Django backend, and displays the result.

function App() {
  // State to store the user's input URL
  const [inputUrl, setInputUrl] = useState("");
  // State to store the shortened URL returned from the backend
  const [shortUrl, setShortUrl] = useState("");

  // Function to send the entered URL to Django backend and get a shortened version
  const handleShorten = async () => {
    // Check if the input field is empty
    if (!inputUrl.trim()) {
      alert("Please enter a URL first!");
      return;
    }

    try {
      // Send POST request to backend API with the input URL
      const res = await fetch("http://127.0.0.1:8000/api/shorten/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      // Parse the response as JSON
      const data = await res.json();

      // If backend returns a shortened URL, update state
      if (data.short_url) {
        setShortUrl(data.short_url);
      } else {
        // Show error message if something went wrong
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      // Handle network or server errors
      console.error("Error communicating with Django:", err);
      alert("Failed to connect to backend.");
    }
  };

  // JSX to render the UI
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener MVP</h1>

      {/* Input field for user to enter a URL */}
      <input
        type="text"
        placeholder="Enter your URL..."
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)} // Update inputUrl state on change
        style={{
          width: "300px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Button to trigger URL shortening */}
      <button
        onClick={handleShorten}
        style={{
          marginLeft: "10px",
          padding: "8px 15px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Shorten
      </button>

      {/* Display the shortened URL if available */}
      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
