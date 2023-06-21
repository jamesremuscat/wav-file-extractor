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

  it('parses the sample file included with this exercise', () => {
    const sampleFile = fs.readFileSync(`${__dirname}/champion-80bpm-132686.wav`);

    const parsed = parseWav(sampleFile);

    expect(parsed.chunkID).toEqual('RIFF');
  });

});
