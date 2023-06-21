import { Parser } from 'binary-parser';

export interface WavFile {
  chunkID: string,
  chunkSize: number,
  format: string,
  fmt: FormatChunk
}

interface ExtraParams {
  size: number,
  data: unknown
}

const ExtraParamsParser = new Parser()
  .endianess('little')
  .int16('size')
  .array('data', { type: 'int8', length: 'size' });

interface FormatChunk {
  subChunkID: string,
  subChunkSize: number,
  audioFormat: number,
  numChannels: number,
  sampleRate: number,
  byteRate: number,
  blockAlign: number,
  bitsPerSample: number,
  extraParams?: ExtraParams
}

const FmtParser = new Parser()
  .endianess('little')
  .string('subChunkID', {
    assert: 'fmt ',
    length: 4
  })
  .int32('subChunkSize')
  .int16('audioFormat')
  .int16('numChannels')
  .int32('sampleRate')
  .int32('byteRate')
  .int16('blockAlign')
  .int16('bitsPerSample')
  .choice(
    'extraParams',
    {
      tag: 'audioFormat',
      choices: {
        1: new Parser() // No further parsing to do if format = 1 (PCM)
      },
      defaultChoice: ExtraParamsParser // Otherwise parse extra parameters
    }
  )


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
