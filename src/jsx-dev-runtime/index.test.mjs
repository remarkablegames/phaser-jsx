import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import { Container } from '../../cjs/components/index.js';
import { createElement } from '../../cjs/element/create.js';
import {
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
} from '../../cjs/jsx-dev-runtime/index.js';

it('exports Fragment', () => {
  assert.strictEqual(Fragment, Container);
});

it('exports jsxDEV', () => {
  assert.notStrictEqual(jsxDEV, createElement);
  assert.strictEqual(typeof jsxDEV, 'function');
});

[jsx, jsxs].forEach((func) => {
  it(`exports ${func.name}`, () => {
    assert.strictEqual(func, createElement);
  });
});
