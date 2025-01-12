import type Phaser from 'phaser';

import { createRef, useRef } from '..';
import { attachRef } from './ref';

const gameObject = {} as Phaser.GameObjects.GameObject;

it('does not attach ref', () => {
  expect(
    attachRef(gameObject, null as unknown as Parameters<typeof attachRef>[1]),
  );
});

it('attaches ref callback', () => {
  const callback = jest.fn();
  expect(attachRef(gameObject, callback));
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(gameObject);
});

it('attaches ref object', () => {
  const ref = createRef<Phaser.GameObjects.GameObject>();
  expect(
    attachRef(gameObject, ref as { current: Phaser.GameObjects.GameObject }),
  );
  expect(ref).toEqual({ current: gameObject });
});

it('attaches ref', () => {
  const ref = useRef<Phaser.GameObjects.GameObject>();
  expect(
    attachRef(gameObject, ref as { current: Phaser.GameObjects.GameObject }),
  );
  expect(ref).toEqual({ current: gameObject });
});
