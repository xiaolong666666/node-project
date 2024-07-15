import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>Welcome to my React App.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<App />);
