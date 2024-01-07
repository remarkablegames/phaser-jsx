import { describe, it } from 'node:test';

import assert from 'assert';

import { name } from '../cjs/index.js';

describe('index', () => {
  it('exports name', () => {
    assert.strictEqual(name, 'phaser-jsx');
  });
});
