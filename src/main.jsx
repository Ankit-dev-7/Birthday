import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/dancing-script/400.css';
import '@fontsource/dancing-script/700.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove loading class from body once React mounts
document.body.classList.remove('loading');
