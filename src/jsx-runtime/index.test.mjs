import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import { Container } from '../../cjs/components/index.js';
import { createElement } from '../../cjs/element/create.js';
import { Fragment, jsx, jsxs } from '../../cjs/jsx-runtime/index.js';

it('exports Fragment', () => {
  assert.strictEqual(Fragment, Container);
});

[jsx, jsxs].forEach((func) => {
  it(`exports ${func.name}`, () => {
    assert.strictEqual(func, createElement);
  });
});
