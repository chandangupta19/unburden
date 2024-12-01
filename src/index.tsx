import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Unburden from './Unburden';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Unburden />
  </React.StrictMode>
);
