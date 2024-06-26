import Phaser from 'phaser';

import { events } from '../constants';
import type { Props } from '../types';

export const skipPropKeys = ['input'];

/**
 * Sets game object props.
 *
 * @param gameObject - Phaser game object.
 * @param props - Element props.
 * @param scene - Phaser scene.
 */
export function setProps(
  gameObject: Phaser.GameObjects.GameObject,
  props: Props,
  scene: Phaser.Scene,
) {
  for (const key in props) {
    if (skipPropKeys.indexOf(key) !== -1) {
      continue;
    }

    const value = props[key];

    if (value && key === 'data') {
      gameObject.setData(value);
      continue;
    }

    if (events[key] && typeof value === 'function') {
      gameObject.setInteractive(props.input);
      gameObject.on(key.slice(2).toLowerCase(), value, scene);
      continue;
    }

    if (key in gameObject) {
      (gameObject as unknown as Props)[key] = value;
      continue;
    }
  }

  if (
    (typeof props.originX === 'number' || typeof props.originY === 'number') &&
    typeof (gameObject as Phaser.GameObjects.Sprite).setOrigin === 'function'
  ) {
    (gameObject as Phaser.GameObjects.Sprite).setOrigin(
      props.originX as number | undefined,
      props.originY as number | undefined,
    );
  }
}
