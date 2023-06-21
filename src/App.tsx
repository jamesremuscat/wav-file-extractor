import { GlobalStyle } from './components/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <div>
        Content here soon™
      </div>
    </ThemeProvider>
  );
}

export default App;
