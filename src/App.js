import React, { Component } from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Calendar from './components/Calendar';
import THEME from './theme';

const globalStyles = {
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      height: '100%',
    },
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <React.Fragment>
          <CssBaseline />
          <Calendar />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(globalStyles)(App);
