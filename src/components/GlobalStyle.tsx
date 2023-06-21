import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
  font-family: ${props => props.theme?.font?.family || 'sans-serif'};
  line-height: 1.5;
  font-weight: 400;

  color-scheme: dark light;
  color: ${props => props.theme?.font?.color || 'white'};
  background-color: ${props => props.theme?.backgroundColor};

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

html, body {
  margin: 0;
  padding: 0;
}

`;
