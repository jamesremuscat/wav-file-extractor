import { TableCell } from './Table';

interface Props {
  blacklist?: string[],
  object: object
}

const snakeToSentenceCase = (text: string) => {
  return text.replace(/(?<=[a-z0-9])([A-Z0-9])/g, ' $1') // Add spaces
    .replace(/^./,(str) => str.toUpperCase()); // Recapitalise words
}

export const ObjectTable = ({ blacklist, object }: Props) => (
  <tbody>
    {
      Object.entries(object).filter(
        ([key]) => !blacklist?.includes(key)
      ).map(
        ([key, value]) => (
          <tr key={key}>
            <TableCell>{snakeToSentenceCase(key)}</TableCell>
            <TableCell>{`${value}`}</TableCell>
          </tr>
        )
      )
    }
  </tbody>
);
