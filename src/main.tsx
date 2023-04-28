import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/initializeFirebase';
import App from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import QueryClientInitializer from './components/QueryClientInitializer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientInitializer>
        <App />
      </QueryClientInitializer>
    </HashRouter>
  </React.StrictMode>
);
