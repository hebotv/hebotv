import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './i18n';
import './index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#202020',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#303030',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
