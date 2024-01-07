import type Phaser from 'phaser';

import { attachRef } from './ref';

const gameObject = {} as Phaser.GameObjects.GameObject;

it('attaches ref', () => {
  const mock = jest.fn();
  expect(attachRef(gameObject, mock));
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(gameObject);
});

it('does not attach ref', () => {
  expect(
    attachRef(gameObject, null as unknown as Parameters<typeof attachRef>[1]),
  );
});
