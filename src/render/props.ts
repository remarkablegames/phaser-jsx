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
    if (skipPropKeys.includes(key)) {
      continue;
    }

    const value = props[key];

    if (value && key === 'data') {
      gameObject.setData(value);
      continue;
    }

    if (events[key] && typeof value === 'function') {
      gameObject.setInteractive(props.input);
      const eventName = key.slice(2).toLowerCase();
      const pointerEvents = [
        'pointerdown',
        'pointerdownoutside',
        'pointermove',
        'pointerout',
        'pointerover',
        'pointerup',
        'pointerupoutside',
        'pointerwheel',
      ];
      if (pointerEvents.includes(eventName)) {
        const wrappedHandler = (pointer: unknown, ...rest: unknown[]) => {
          value(pointer, gameObject, ...rest);
        };
        gameObject.on(eventName, wrappedHandler, scene);
      } else {
        gameObject.on(eventName, value, scene);
      }
      continue;
    }

    if (key === 'style' && value && typeof value === 'object') {
      setStyle(gameObject, value);
      continue;
    } else if (key in gameObject) {
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

function setStyle(gameObject: Phaser.GameObjects.GameObject, style: object) {
  const text = gameObject as Phaser.GameObjects.Text;
  text.setStyle?.(style);

  const padding = (style as Phaser.Types.GameObjects.Text.TextStyle).padding;
  if (padding !== undefined) {
    text.setPadding?.(padding);
  }
}
