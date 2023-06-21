import { Parser } from 'binary-parser';

interface WavFile {
  chunkID: string
}

const WavParser = new Parser()
  .endianess('big')
  .string('chunkID', {
    assert: 'RIFF',
    length: 4
  });

export function parseWav(wav: Buffer): WavFile {
  return WavParser.parse(wav);
}
