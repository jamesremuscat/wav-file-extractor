import { useEffect, useState } from 'react';
import { parseWav, type WavFile } from '../modules/parser';
import { styled } from 'styled-components';
import { Heading } from './Heading';
import { Table, TableHeader } from './Table';
import { ObjectTable } from './ObjectTable';

interface Props {
  file?: File,
  setProcessing: (processing: boolean) => void
}

async function parse(file: File) {
  const buffer = await file.arrayBuffer();
  const parsed = parseWav(buffer);
  return parsed;
}

const Inner = styled.div`

  flex-grow: 2;

  border: 0.5em solid ${props => props.theme?.borderColor};
  margin-top: 0.5em;
  background-color: ${props => props.theme?.borderColor};

`;

export const DataPane = ({ file, setProcessing }: Props) => {
  const [parsedFile, setParsedFile] = useState<WavFile>();

  useEffect(
    () => {
      if (file) {
        setProcessing(true);
        parse(file).then(
          (pf) => {
            setParsedFile(pf);
            setProcessing(false);
          }
        )
      }
    },
    [file, setProcessing]
  );

  if (!parsedFile) {
    return null;
  }

  return (
    <Inner>
      <Heading>Results</Heading>
      <Table>
        <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '50%' }} />
        </colgroup>
        <thead>
          <tr>
            <TableHeader>Header</TableHeader>
            <TableHeader>Value</TableHeader>
          </tr>
        </thead>
        <ObjectTable
          blacklist={['fmt']}
          object={parsedFile}
        />
        <ObjectTable
          blacklist={['subchunk1Size', 'extraParamsSize', 'extraParams']}
          object={parsedFile.fmt}
        />
      </Table>
    </Inner>
  );
}
