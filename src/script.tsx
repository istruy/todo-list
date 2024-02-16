import * as React from 'react';
import './common.css';
import { initializeAPI } from './api';
import App from './Components/App/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

const firebaseApp = initializeAPI();
const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

root.render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
);
