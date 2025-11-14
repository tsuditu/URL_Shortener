import { useState } from "react";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  // Function to send the entered URL to Django and get a shortened version
  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      alert("Please enter a URL first!");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/shorten/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await res.json();

      if (data.short_url) {
        setShortUrl(data.short_url);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error communicating with Django:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener MVP</h1>

      <input
        type="text"
        placeholder="Enter your URL..."
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

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
