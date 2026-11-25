import Phaser from 'phaser';

import { isEventKey } from '../constants';
import type { Props } from '../types';

export const skipPropKeys = ['input'];

/**
 * Sets game object props.
 *
 * @param gameObject - Phaser game object.
 * @param props - Element props.
 * @param scene - Phaser scene.
 * @param skipEventKeys - Optional set of event prop keys whose listeners are already registered and should not be re-attached.
 */
export function setProps(
  gameObject: Phaser.GameObjects.GameObject,
  props: Props,
  scene: Phaser.Scene,
  skipEventKeys?: Set<string>,
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

    if (isEventKey(key) && typeof value === 'function') {
      if (skipEventKeys?.has(key)) {
        continue;
      }
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
        const handler = value as (...args: unknown[]) => void;
        const wrappedHandler = (pointer: unknown, ...rest: unknown[]) => {
          handler(pointer, gameObject, ...rest);
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
    } else if (key === 'fillColor' || key === 'fillAlpha') {
      const fillColor =
        key === 'fillColor' ? (value as number) : (props.fillColor as number);

      const fillAlpha =
        key === 'fillAlpha'
          ? (value as number)
          : (props.fillAlpha as number | undefined);

      const rectangle = gameObject as Phaser.GameObjects.Rectangle | undefined;
      rectangle?.setFillStyle(fillColor, fillAlpha);
      continue;
    } else if (key in gameObject) {
      (gameObject as unknown as Props)[key] = value;
      continue;
    }
  }

  if (typeof props.originX === 'number' || typeof props.originY === 'number') {
    const sprite = gameObject as Phaser.GameObjects.Sprite | undefined;
    sprite?.setOrigin(
      (props.originX as number | undefined) ?? 0.5,
      (props.originY as number | undefined) ?? 0.5,
    );
  }
}

function setStyle(gameObject: Phaser.GameObjects.GameObject, style: object) {
  const text = gameObject as Partial<Phaser.GameObjects.Text>;
  text.setStyle?.(style);

  const padding = (style as Phaser.Types.GameObjects.Text.TextStyle).padding;
  if (padding !== undefined) {
    text.setPadding?.(padding);
  }
}
