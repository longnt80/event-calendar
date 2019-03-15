import React, { Component } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Calendar from './components/Calendar';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    & > #root {
      height: 100%;
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

const AppWrapper = styled.div`
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Calendar />
      </AppWrapper>
    );
  }
}

export default App;
