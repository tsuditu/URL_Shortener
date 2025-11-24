// ==========================
// UrlInput.jsx – URL Input Component (Detailed Comments)
// ==========================

import React from 'react';
import { Button, Input, Form, FormGroup, Spinner } from 'reactstrap';

// This is a stateless (presentational) component.
// It doesn't store any state by itself — instead, it receives everything from App.js through props.
// Props:
// - inputUrl: the current value inside the text input field.
// - setInputUrl: the function that updates the inputUrl state in App.js.
// - handleShorten: the function that triggers URL shortening when the button is clicked.
// - loading: boolean that indicates if the backend request is in progress.
function UrlInput({ inputUrl, setInputUrl, handleShorten, loading }) {
  return (
    // Form container: Bootstrap classes for flexbox alignment and spacing.
    <Form className="d-flex justify-content-center align-items-center mt-4">
      <FormGroup className="d-flex">
        {/* Controlled input field: its value is bound to the inputUrl state from App.js */}
        <Input
            type="text" // Defines a text input.
            placeholder="Enter your URL..." // Placeholder shown when input is empty.
            value={inputUrl} // Value controlled by React state from App.js.
            onChange={(e) => setInputUrl(e.target.value)} // Sends typed text back to App.js through setInputUrl.
            style={{ width: '300px' }} // Inline style for fixed input width.
        />

        {/* Button that triggers the URL shortening process */}
        <Button
            color="primary" // Bootstrap blue button.
            className="ms-2" // Adds left margin for spacing.
            onClick={handleShorten} // Calls the function from App.js.
            disabled={loading} // Disables button when loading is true.
        >
          {/* Conditional rendering: if loading, show spinner; else show 'Shorten' */}  
          {loading ? <Spinner size="sm" /> : 'Shorten'}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default UrlInput;