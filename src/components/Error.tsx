import { Heading } from './Heading';
import { Pane } from './Pane';

export const Error = () => (
  <Pane grow={2}>
    <Heading>Error</Heading>
    <p>Could not parse WAV file. Please try another file.</p>
  </Pane>
);
