import { useEffect, useState } from 'react';
import { parseWav, type WavFile } from '../modules/parser';
import { styled } from 'styled-components';

interface Props {
  file?: File
}

async function parse(file: File) {
  const buffer = await file.arrayBuffer();
  const parsed = parseWav(buffer);
  return parsed;
}

const Inner = styled.div`

  flex-grow: 3;

`;

export const DataPane = ({ file }: Props) => {
  const [parsedFile, setParsedFile] = useState<WavFile>();

  useEffect(
    () => {
      if (file) {
        parse(file).then(setParsedFile)
      }
    },
    [file]
  );

  return (
    <Inner>
      <p>{parsedFile?.chunkID}</p>
    </Inner>
  );
}
