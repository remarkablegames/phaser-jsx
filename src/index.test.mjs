import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import { createElement, jsx } from '../cjs/index.js';

it('exports createElement', () => {
  assert.strictEqual(typeof createElement, 'function');
});

it('exports jsx', () => {
  assert.strictEqual(jsx, createElement);
});
