import { styled } from 'styled-components';
import { DropTarget } from './DropTarget';
import { useState } from 'react';
import { DataPane } from './DataPane';

const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Extractor = () => {

  const [file, setFile] = useState<File>();

  return (
    <Inner>
      <DropTarget onFileDropped={setFile} />
      <DataPane file={file} />
    </Inner>
  );
}
