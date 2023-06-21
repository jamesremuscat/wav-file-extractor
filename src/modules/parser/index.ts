import { Parser } from 'binary-parser';

export interface WavFile {
  chunkID: string,
  chunkSize: number,
  format: string,
  fmt: FormatChunk
}

interface FormatChunk {
  subchunk1ID: string,
  subchunk1Size: number,
  audioFormat: number,
  numChannels: number,
  sampleRate: number,
  byteRate: number,
  blockAlign: number,
  bitsPerSample: number,
  extraParamsSize: number
}

const FmtParser = new Parser()
  .endianess('little')
  .string('subchunk1ID', {
    assert: 'fmt ',
    length: 4
  })
  .int32('subchunk1Size')
  .int16('audioFormat')
  .int16('numChannels')
  .int32('sampleRate')
  .int32('byteRate')
  .int16('blockAlign')
  .int16('bitsPerSample')
  .int16('extraParamsSize')
  .array('extraParams', { type: 'int8', length: 'extraParamsSize' });

const WavParser = new Parser()
  .endianess('little')
  .string('chunkID', {
    assert: 'RIFF',
    length: 4
  })
  .int32('chunkSize')
  .string('format', {
    assert: 'WAVE',
    length: 4
  })
  .nest('fmt', { type: FmtParser });

export function parseWav(wav: ArrayBuffer): WavFile {
  // There's an error in the type definitions for the binary-parser library
  // that cause TypeScript to flag this as an error; but in fact the parse()
  // method is happy to take either a Buffer or a Uint8Array.
  // @ts-ignore
  return WavParser.parse(new Uint8Array(wav));
}
