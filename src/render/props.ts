import Phaser from 'phaser';

import { events } from '../constants';
import type { Props } from '../types';

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
    const value = props[key];

    if (
      key === 'style' &&
      value instanceof Object &&
      gameObject instanceof Phaser.GameObjects.Text
    ) {
      gameObject.setStyle(value);
      continue;
    }

    if (events[key] && typeof value === 'function') {
      gameObject.setInteractive();
      gameObject.on(key.slice(2).toLowerCase(), value, scene);
      continue;
    }

    if (key in gameObject) {
      (gameObject as unknown as Props)[key] = value;
      continue;
    }
  }
}
