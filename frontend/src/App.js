import { useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/test/");
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener MVP</h1>
      <button onClick={handleClick}>Ping Django</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
