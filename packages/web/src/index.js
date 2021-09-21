import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#202020',
      dark: '#101010',
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: '#fff',
          borderWidth: '1px',
        },
      },
    }
  }
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
