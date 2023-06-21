import { styled } from 'styled-components';

export const Table = styled.table`
  width: 100%;

  border-spacing: 0.5em;
`;

export const TableHeader = styled.th`

  text-transform: uppercase;
  text-align: left;

  background-color: ${props => props.theme?.headingColor};
  padding: 0.25em;

`;

export const TableCell = styled.td`
  text-transform: uppercase;
  text-align: left;

  background-color: ${props => props.theme?.backgroundColor};

  padding: 0.25em;
`;
