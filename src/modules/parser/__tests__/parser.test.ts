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
    expect(parsed.format).toEqual('WAVE');

    const fmt = parsed.fmt;

    expect(fmt.subChunkID).toEqual('fmt ');
    expect(fmt.subChunkSize).toEqual(16);
    expect(fmt.audioFormat).toEqual(1);
    expect(fmt.numChannels).toEqual(2);
    expect(fmt.sampleRate).toEqual(44100);
    expect(fmt.byteRate).toEqual(176400);
    expect(fmt.blockAlign).toEqual(4);
    expect(fmt.bitsPerSample).toEqual(16);
  });

  it('parses another wav file', () => {
    const sampleFile = fs.readFileSync(`${__dirname}/alarm00.wav`);

    const parsed = parseWav(sampleFile);

    expect(parsed.chunkID).toEqual('RIFF');
    expect(parsed.chunkSize).toEqual(5464);
    expect(parsed.format).toEqual('WAVE');

    const fmt = parsed.fmt;

    expect(fmt.subChunkID).toEqual('fmt ');
    expect(fmt.subChunkSize).toEqual(16);
    expect(fmt.audioFormat).toEqual(1);
    expect(fmt.numChannels).toEqual(1);
    expect(fmt.sampleRate).toEqual(11025);
    expect(fmt.byteRate).toEqual(11025);
    expect(fmt.blockAlign).toEqual(1);
    expect(fmt.bitsPerSample).toEqual(8);
  });

});
