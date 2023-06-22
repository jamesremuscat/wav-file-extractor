import { useDropzone } from 'react-dropzone';

import { Heading } from './Heading';
import { useCallback } from 'react';
import { styled } from 'styled-components';
import { Pane } from './Pane';

type InnerProps = {
  $isActive: boolean,
  $isProcessing: boolean
}

const Inner = styled(Pane)<InnerProps>`
  display: flex;
  flex-direction: column;

  text-transform: uppercase;

  background-color: ${ props => props.$isActive ? props.theme?.borderColor : 'transparent' };

  font-weight: ${ props => props.$isActive || props.$isProcessing ? 'bold' : 'normal' };

`;

const Message = styled.div`
  align-self: center;
  margin: auto;
`;

interface Props {
  isProcessing?: boolean,
  onFileDropped?: (f: File) => void
}

export const DropTarget = ({ isProcessing, onFileDropped }: Props) => {

  const onDrop = useCallback(
    (files: File[]) => {
      onFileDropped?.(files[0])
    },
    [onFileDropped]
  );

  const dropzone = useDropzone({ onDrop });

  return (
    <Inner
      grow={1}
      {...dropzone.getRootProps()}
      $isActive={dropzone.isDragActive}
      $isProcessing={isProcessing}
    >
      <Heading>WAV File Extractor</Heading>
      <input {...dropzone.getInputProps()} />
      {
        isProcessing ? <Message>File dropped</Message> :
        dropzone.isDragActive ?
          <Message>Drop here</Message> :
          <Message data-test-id='dropTarget'>Drag file</Message>
      }
    </Inner>
  );
}
