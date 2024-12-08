// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import mới từ React 18
import App from './App';
import './index.css';

// Tạo root và render ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root')); // Tạo root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);