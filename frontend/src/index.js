import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard'; // ✅ Ensure correct path

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error(
    "❌ Root element not found! Ensure 'index.html' contains a <div id='root'></div>"
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />{' '}
          {/* ✅ Added Dashboard route */}
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
