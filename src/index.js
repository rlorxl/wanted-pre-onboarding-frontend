import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import App from './App';
import GlobalStyle from './style/global-style';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
