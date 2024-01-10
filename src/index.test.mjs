import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import {
  createElement,
  createRef,
  Image,
  jsx,
  render,
  Video,
} from '../cjs/index.js';

[createElement, Image, render, Video].forEach((func) => {
  it(`exports ${func.name}`, () => {
    assert.strictEqual(typeof func, 'function');
  });
});

it('exports createElement', () => {
  assert.deepEqual(createElement(Image, { x: 42 }), {
    key: null,
    props: { x: 42 },
    type: Image,
  });
});

it('exports createRef', () => {
  assert.deepEqual(createRef(), { current: null });
});

it('exports jsx', () => {
  assert.strictEqual(jsx, createElement);
});
