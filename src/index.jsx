import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Entrance animations assume the browser can produce rendering frames; the
// App probe removes this flag in environments where it cannot.
document.documentElement.classList.add('frames-ok');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
