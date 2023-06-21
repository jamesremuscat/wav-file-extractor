import { styled } from 'styled-components';

interface Props {
  grow?: number
}

export const Pane = styled.div<Props>`
  border: 0.5em solid ${props => props.theme?.borderColor};
  margin-top: 0.5em;
  background-color: ${props => props.theme?.borderColor};
  flex-grow: ${props => props.grow || 0}
`;
