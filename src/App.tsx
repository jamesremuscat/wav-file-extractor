import { GlobalStyle } from './components/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from './theme';
import { Container } from './components/Container';
import { Content } from './components/Content';
import { Extractor } from './components/Extractor';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        <Content>
          <Extractor />
        </Content>
      </Container>
    </ThemeProvider>
  );
}

export default App;
