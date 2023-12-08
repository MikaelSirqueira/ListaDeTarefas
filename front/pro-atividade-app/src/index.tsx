import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Menu from './components/Menu';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <BrowserRouter>
      <Menu />
      <div className="container">
        <App />
      </div>
    </BrowserRouter>,
  );
} else {
  console.error('Element with ID "root" not found in the document.');
}
