import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'lodash.debounce';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Add lodash to the import map.
const importMap = document.querySelector('script[type="importmap"]');
if(importMap) {
  const map = JSON.parse(importMap.innerHTML);
  map.imports['lodash.debounce'] = "https://cdn.jsdelivr.net/npm/lodash.debounce@4.0.8/index.min.js";
  importMap.innerHTML = JSON.stringify(map);
}
