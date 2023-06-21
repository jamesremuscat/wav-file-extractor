import { styled } from 'styled-components';

export const Heading = styled.h2`
  background-color: ${props => props.theme?.borderColor};

  margin: 0;
  padding-bottom: 0.5em;

  text-transform: uppercase;
`;
