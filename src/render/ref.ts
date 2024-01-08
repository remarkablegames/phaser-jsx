import type { GameObjectProps } from '../types';

/**
 * Attaches game object ref.
 *
 * @param gameObject - Phaser game object.
 * @param ref - Ref callback.
 */
export function attachRef(
  gameObject: Phaser.GameObjects.GameObject,
  ref: GameObjectProps['ref'],
) {
  if (typeof ref === 'function') {
    ref(gameObject);
  }
}
