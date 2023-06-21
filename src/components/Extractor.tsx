import { styled } from 'styled-components';
import { DropTarget } from './DropTarget';
import { useCallback, useState } from 'react';
import { DataPane } from './DataPane';
import { Error } from './Error';

const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Extractor = () => {

  const [file, setFile] = useState<File>();
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [isError, setErrored] = useState<boolean>(false);

  const handleError = useCallback(
    () => {
      setErrored(true);
      setFile(undefined);
    },
    []
  );

  const handleFile = useCallback(
    (file: File) => {
      setFile(undefined);
      setErrored(false);
      setFile(file);
    },
    []
  )

  return (
    <Inner>
      <DropTarget
        isProcessing={isProcessing}
        onFileDropped={handleFile}
      />
      <DataPane
        file={file}
        onError={handleError}
        setProcessing={setProcessing}
      />
      {
        isError && (<Error />)
      }
    </Inner>
  );
}
