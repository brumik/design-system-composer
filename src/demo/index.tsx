import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '../library';
import * as Components from '@mui/material';
import config from './muiConfig';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <GlobalStyle />
    <App
      Components={Components}
      config={config}
      namespace='demo-app'
    />
  </StrictMode>
);
