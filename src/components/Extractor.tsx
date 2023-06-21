import { styled } from 'styled-components';
import { DropTarget } from './DropTarget';

const Inner = styled.div`
  border: 0.5em solid ${props => props.theme?.borderColor};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Extractor = () => {
  return (
    <Inner>
      <DropTarget />
    </Inner>
  );
}
