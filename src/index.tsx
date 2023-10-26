import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './media.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('ReactApp') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
