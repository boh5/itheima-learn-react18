import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import sum from '@/test'

console.log(sum(1, 3))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
