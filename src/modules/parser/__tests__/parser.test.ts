import { describe, expect, it } from 'vitest';

import fs from 'fs';

import { parseWav } from '..';

describe('parseWav', () => {

  it('fails on a zero-length input', () => {
    const sampleFile = Buffer.from('');

    expect(
      () => parseWav(sampleFile)
    ).toThrowError('RIFF');
  });

  it('fails on a non-wav file', () => {
    const sampleFile = Buffer.from('PK\x03\x04');
    expect(
      () => parseWav(sampleFile)
    ).toThrowError('RIFF');
  })

  it('parses the sample file included with this exercise', () => {
    const sampleFile = fs.readFileSync(`${__dirname}/champion-80bpm-132686.wav`);

    const parsed = parseWav(sampleFile);

    expect(parsed.chunkID).toEqual('RIFF');
    expect(parsed.chunkSize).toEqual(20643910);

    const fmt = parsed.format;

    expect(fmt.subchunk1ID).toEqual('fmt ');
    expect(fmt.subchunk1Size).toEqual(16);
    expect(fmt.audioFormat).toEqual(1);
    expect(fmt.numChannels).toEqual(2);
    expect(fmt.sampleRate).toEqual(44100);
    expect(fmt.byteRate).toEqual(176400);
    expect(fmt.blockAlign).toEqual(4);
    expect(fmt.bitsPerSample).toEqual(16);
  });

});
