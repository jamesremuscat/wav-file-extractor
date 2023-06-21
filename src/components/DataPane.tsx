import { useEffect, useState } from 'react';
import { parseWav, type WavFile } from '../modules/parser';
import { Heading } from './Heading';
import { Table, TableHeader } from './Table';
import { ObjectTable } from './ObjectTable';
import { Pane } from './Pane';

interface Props {
  file?: File,
  onError: () => void,
  setProcessing: (processing: boolean) => void
}

async function parse(file: File) {
  const buffer = await file.arrayBuffer();
  const parsed = parseWav(buffer);
  return parsed;
}

export const DataPane = ({ file, onError, setProcessing }: Props) => {
  const [parsedFile, setParsedFile] = useState<WavFile>();

  useEffect(
    () => {
      if (file) {
        setProcessing(true);
        parse(file).then(
          setParsedFile
        ).catch(
          onError
        ).finally(
          () => setProcessing(false)
        )
      }
      else {
        setParsedFile(undefined);
      }
    },
    [file, onError, setProcessing]
  );

  if (!parsedFile) {
    return null;
  }

  return (
    <Pane grow={2}>
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
    </Pane>
  );
}
