import { useDropzone } from 'react-dropzone';

import { Heading } from './Heading';
import { useCallback } from 'react';
import { styled } from 'styled-components';

type InnerProps = {
  $isActive: boolean
}

const Inner = styled.div<InnerProps>`

  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;

  background-color: ${ props => props.$isActive ? props.theme?.borderColor : 'transparent' };

  font-weight: ${ props => props.$isActive ? 'bold' : 'normal' };

`;

interface Props {
  onFileDropped?: (f: File) => void
}

export const DropTarget = ({ onFileDropped }: Props) => {

  const onDrop = useCallback(
    (files: File[]) => {
      onFileDropped?.(files[0])
    },
    [onFileDropped]
  );

  const dropzone = useDropzone({ onDrop });

  return (
    <>
      <Heading>WAV File Extractor</Heading>
      <Inner
        {...dropzone.getRootProps()}
        $isActive={dropzone.isDragActive}
      >
        <input {...dropzone.getInputProps()} />
        {
          dropzone.isDragActive ?
            <p>Drop here</p> :
            <p>Drag file</p>
        }
      </Inner>
    </>
  );
}
