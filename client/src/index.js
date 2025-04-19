import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DataProvider from './Data/DataProvider'; // ✅ Import Data Context
import './index.css';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider> {/* ✅ Wrap the App inside DataProvider */}
    <Router>
      <App />
    </Router>
  </DataProvider>
);
