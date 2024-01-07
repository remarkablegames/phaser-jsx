import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import { createElement, Image, jsx, Video } from '../cjs/index.js';

[createElement, Image, Video].forEach((func) => {
  it(`exports ${func.name}`, () => {
    assert.strictEqual(typeof func, 'function');
  });
});

it('exports jsx', () => {
  assert.strictEqual(jsx, createElement);
});

it('exports Image', () => {
  assert.strictEqual(typeof Image, 'function');
});
